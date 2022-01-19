import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ShowUsersDecrypter, ShowUsersResponse } from 'src/app/models/showusers_response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-tabla-super-admin',
  templateUrl: './tabla-super-admin.component.html',
  styleUrls: ['./tabla-super-admin.component.scss'],
})

export class TablaSuperAdminComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'email', 'sucursal', 'status_desc', 'fecha_registro', 'Acciones'];
  usuarios = [];

  identity = new FormGroup({
    cedula: new FormControl(''),
  });

  isLoadingResults = false;

  expandedElement: any | null;

  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();

  defaultResponse: DefaultResponse;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  statusFilter = false;
  ShowUserResponse: ShowUsersResponse;

  @Output() editUser = new EventEmitter<any>();
  @Output() showUser = new EventEmitter<any>();

  PAGESIZE = 12

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private modal: ModalService,
    private toaster: ToasterService,
    private usuario: UsuariosService,
  ) 
  {
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.isLoadingResults = true;
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            init_row: this.crypto.encryptJson(((this.paginator.pageIndex * this.PAGESIZE)).toString()),
            limit_row: this.crypto.encryptJson(((this.paginator.pageIndex + 1) * this.PAGESIZE).toString()),
          }))
          return this.usuario.doAllUser(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))

          this.ShowUserResponse = new ShowUsersDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.crypto.setKeys(this.ShowUserResponse.keyS, this.ShowUserResponse.ivJ, this.ShowUserResponse.keyJ, this.ShowUserResponse.ivS)
          this.resultsLength = parseInt(this.ShowUserResponse.total_row);
          console.log(this.ShowUserResponse)
          return this.ShowUserResponse.usuarios;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.usuarios = data
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.identity.reset();
        this.statusFilter = false;
      });
  }


  _findUser() {
    var filter = this.identity.get('cedula').value
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('ACTIVO'),
      cedula: this.crypto.encryptJson(filter),
      app_id: this.crypto.encryptJson('1'),

    }))
    this.isLoadingResults = true;
    this.usuario.doFindUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      
      this.ShowUserResponse = new ShowUsersDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.crypto.setKeys(this.ShowUserResponse.keyS, this.ShowUserResponse.ivJ, this.ShowUserResponse.keyJ, this.ShowUserResponse.ivS)
      this.toaster.success(this.ShowUserResponse.M)

      this.usuarios = this.ShowUserResponse.usuarios
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
  }

  statusColor(status) {
    switch (status) {
      case 'ACTIVO':
        return "active"
      case 'INACTIVO':
      default:
        return "desaffiliate"
    }
  }

  disable(user: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      cedula: this.crypto.encryptJson(user.cedula),
      status_desc: this.crypto.encryptJson('INACTIVO'),
    }))
    this.loading = true;
    this.usuario.doDeleteUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)

      switch (this.defaultResponse.R) {
        case constant.R0:
          window.location.reload();
          this.toaster.success(this.defaultResponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.defaultResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  activate(user: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      cedula: this.crypto.encryptJson(user.cedula),
      status_desc: this.crypto.encryptJson('ACTIVO'),
    }))
    this.loading = true;
    this.usuario.doDeleteUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)

      switch (this.defaultResponse.R) {
        case constant.R0:
          // this.router.navigateByUrl('/admin/app/(adr:clientela)')
          window.location.reload();
          this.toaster.success(this.defaultResponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.defaultResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  clear() {
    this.identity.reset();
  }

  _editUser(user) {
    this.editUser.emit(user)
  }

  _showUser(user) {
    this.showUser.emit(user)
  }

  saveDesativate(user: any) {
    this.modal.confirm("¿Desea desabilitar a este usuario?").subscribe(result => {
      if (result) {
        this.disable(user)
      }
    })
  }

  saveActive(user: any) {
    this.modal.confirm("¿Desea Activar a este usuario?").subscribe(result => {
      if (result) {
        this.activate(user)
      }
    })
  }

}