import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { ShowSucursalesResponse, ShowSucursalesDecrypter } from 'src/app/models/showsucursales_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-tabla-sucursales',
  templateUrl: './tabla-sucursales.component.html',
  styleUrls: ['./tabla-sucursales.component.scss']
})
export class TablaSucursalesComponent implements OnInit {

  displayedColumns: string[] = ['zona', 'sucursal', 'estatus', 'acciones'];
  sucursales = [];

  isLoadingResults = false;


  @Output() count = new EventEmitter<number>();
  @Output() editSucursales = new EventEmitter<any>();
  defaultResponse: DefaultResponse;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  showSucursalesResponse: ShowSucursalesResponse;
  statusFilter = false;

  PAGESIZE = 25

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService
  ) {
    this.dataSource = new MatTableDataSource(this.sucursales);
  }

  identifier = new FormGroup({
    sucursal: new FormControl(''),
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
            limit_row: this.crypto.encryptJson(( this.PAGESIZE).toString()),
          }))
          return this.inventario.doAllSucursales(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.showSucursalesResponse = new ShowSucursalesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          // //this.crypto.setKeys(this.showSucursalesResponse.keyS, this.showSucursalesResponse.ivJ, this.showSucursalesResponse.keyJ, this.showSucursalesResponse.ivS)
          this.resultsLength = parseInt(this.showSucursalesResponse.total_row);
          // console.log(this.showSucursalesResponse)
          return this.showSucursalesResponse.sucursales;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          // console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.sucursales = data
        this.dataSource = new MatTableDataSource(this.sucursales);
        this.identifier.reset();
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
      case 'NO ACTIVO':
      default:
        return "desaffiliate"
    }
  }

  disable(sucursal: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      occ_id: this.crypto.encryptJson(sucursal.id),
      status_desc: this.crypto.encryptJson('NO ACTIVO'),
    }))
    this.loading = true;
    this.inventario.doChangeStatusSucursal(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false

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

  activate(sucursal: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      occ_id: this.crypto.encryptJson(sucursal.id),
      status_desc: this.crypto.encryptJson('ACTIVO'),
    }))
    this.loading = true;
    this.inventario.doChangeStatusSucursal(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false

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

  _findClient() {
    var filter = this.identifier.get('sucursal').value
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('ACTIVO'),
      filter: this.crypto.encryptJson(filter),

    }))
    this.isLoadingResults = true;
    this.inventario.doFindSucursales(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      // console.log(this.crypto.decryptString(res))
      this.showSucursalesResponse = new ShowSucursalesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.sucursales = this.showSucursalesResponse.sucursales
      this.dataSource = new MatTableDataSource(this.sucursales);
    })
  }

  clear() {
    this.identifier.reset();
    this.statusFilter = false;
  }

  _editSucursal(sucursal) {
    this.editSucursales.emit(sucursal)
  }

  saveDesativate(sucursal: any) {
    this.modal.confirm("¿Desea desabilitar a esta sucursal?").subscribe(result => {
      if (result) {
        this.disable(sucursal)
      }
    })
  }

  saveActive(sucursal: any) {
    this.modal.confirm("¿Desea Activar a esta sucursal?").subscribe(result => {
      if (result) {
        this.activate(sucursal)
      }
    })
  }

}
