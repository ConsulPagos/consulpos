import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AffiliateDetailJoinInterface } from 'src/app/models/afiliado';
import { ShowClientsDecrypter, ShowClientsResponse } from 'src/app/models/showclients_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { AdminService } from "../../services/admin.service";
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientela-afiliados',
  templateUrl: './clientela-afiliados.component.html',
  styleUrls: ['./clientela-afiliados.component.scss'],
})

export class ClientelaAfiliadosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['t_c_letra', 'rif', 'nombre_comercial', 'status_desc', 'fecha_registro', 'Acciones'];
  clientes = [];

  isLoadingResults = false;

  expandedElement: AffiliateDetailJoinInterface | null;

  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();
  @Output() editClient = new EventEmitter<any>();
  @Output() showClient = new EventEmitter<any>();
  defaultResponse: DefaultResponse;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<AffiliateDetailJoinInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  showclientResponse: ShowClientsResponse;
  statusFilter = false;

  PAGESIZE = 12

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource(this.clientes);
  }

  identity = new FormGroup({
    rif: new FormControl(''),
  });

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
          return this.cliente.doAll(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          
          // this.count.emit(25)
          // this.paginator.pageIndex = 1;

          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.showclientResponse = new ShowClientsDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.crypto.setKeys(this.showclientResponse.keyS, this.showclientResponse.ivJ, this.showclientResponse.keyJ, this.showclientResponse.ivS)
          this.resultsLength = parseInt(this.showclientResponse.total_row);
          console.log(this.showclientResponse)
          return this.showclientResponse.clientes;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.clientes = data
        this.dataSource = new MatTableDataSource(this.clientes);
        this.identity.reset();
        this.statusFilter = false;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  statusColor(status) {
    switch (status) {
      case 'ACTIVO':
        return "active"
      case 'DESAFILIADO':
      default:
        return "desaffiliate"
    }
  }

  disable(client: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(client.rif),
      status_desc: this.crypto.encryptJson('DESAFILIADO'),
    }))
    this.loading = true;
    this.cliente.doDelete(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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

  activate(client: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(client.rif),
      status_desc: this.crypto.encryptJson('ACTIVO'),
    }))
    this.loading = true;
    this.cliente.doDelete(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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

  _findClient() {
    var filter = this.identity.get('rif').value
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('ACTIVO'),
      filter: this.crypto.encryptJson(filter),

    }))
    this.isLoadingResults = true;
    this.cliente.doFind(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      this.showclientResponse = new ShowClientsDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.crypto.setKeys(this.showclientResponse.keyS, this.showclientResponse.ivJ, this.showclientResponse.keyJ, this.showclientResponse.ivS)
      this.toaster.success(this.showclientResponse.M)

      this.clientes = this.showclientResponse.clientes
      this.dataSource = new MatTableDataSource(this.clientes);


    })
  }

  clear() {
    this.identity.reset();
    this.statusFilter = false;
  }

  _editClient(client) {
    this.editClient.emit(client)
  }

  _showClient(client) {
    this.showClient.emit(client)
  }

  saveDesativate(client: any) {
    this.modal.confirm("¿Desea desabilitar a este cliente?").subscribe(result => {
      if (result) {
        this.disable(client)
      }
    })
  }

  saveActive(client: any) {
    this.modal.confirm("¿Desea Activar a este cliente?").subscribe(result => {
      if (result) {
        this.activate(client)
      }
    })
  }

}