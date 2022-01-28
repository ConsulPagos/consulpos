import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { constant } from 'src/app/shared/utils/constant';
import { ShowRolesDecrypter, ShowRolesResponse } from 'src/app/models/showroles_response';


@Component({
  selector: 'app-tabla-roles',
  templateUrl: './tabla-roles.component.html',
  styleUrls: ['./tabla-roles.component.scss']
})
export class TablaRolesComponent implements OnInit {

  displayedColumns: string[] = ['rol','descripcion', 'Acciones'];
  roles = [];

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
  PAGESIZE = 12;

  @Output() editRol = new EventEmitter<any>();

  ShowRollResponse: ShowRolesResponse;

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private modal: ModalService,
    private toaster: ToasterService,
    private rol: RolesService,
  ) {
    this.dataSource = new MatTableDataSource(this.roles);
  }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

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
          
          return this.rol.doAllRoll(`${this.session.getDeviceId()};${data}`)
          
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))

          this.ShowRollResponse = new ShowRolesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.crypto.setKeys(this.ShowRollResponse.keyS, this.ShowRollResponse.ivJ, this.ShowRollResponse.keyJ, this.ShowRollResponse.ivS)
          this.resultsLength = parseInt(this.ShowRollResponse.total_row);
          console.log(this.ShowRollResponse)
          return this.ShowRollResponse.roles;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.roles = data
        this.dataSource = new MatTableDataSource(this.roles);
        this.statusFilter = false;
      });
  }

  _findRoll() {
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('ACTIVO'),
    }))
    this.isLoadingResults = true;
    this.rol.doFindRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      
      this.ShowRollResponse = new ShowRolesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.crypto.setKeys(this.ShowRollResponse.keyS, this.ShowRollResponse.ivJ, this.ShowRollResponse.keyJ, this.ShowRollResponse.ivS)
      this.toaster.success(this.ShowRollResponse.M)

      this.roles = this.ShowRollResponse.roles
      this.dataSource = new MatTableDataSource(this.roles);
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

  _editRol(user) {
    this.editRol.emit(user)
  }

}


