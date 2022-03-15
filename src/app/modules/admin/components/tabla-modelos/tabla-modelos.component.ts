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
import { ShowModelosResponse, ShowModelosDecrypter } from 'src/app/models/showModelos_response';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-tabla-modelos',
  templateUrl: './tabla-modelos.component.html',
  styleUrls: ['./tabla-modelos.component.scss']
})
export class TablaModelosComponent implements OnInit {

  displayedColumns: string[] = ['marca', 'modelo', 'estatus','precio', 'acciones'];
  modelos = [];

  isLoadingResults = false;


  @Output() count = new EventEmitter<number>();
  @Output() editModelos = new EventEmitter<any>();
  defaultResponse: DefaultResponse;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  showModelosResponse: ShowModelosResponse;
  statusFilter = false;

  PAGESIZE = 12

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
  ) {
    this.dataSource = new MatTableDataSource(this.modelos);
  }

  identifier = new FormGroup({
    modelos: new FormControl(''),
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
            limit_row: this.crypto.encryptJson((this.PAGESIZE).toString()),
          }))
          return this.inventario.doAllModels(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.showModelosResponse = new ShowModelosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          // //this.crypto.setKeys(this.showModelosResponse.keyS, this.showModelosResponse.ivJ, this.showModelosResponse.keyJ, this.showModelosResponse.ivS)
          this.resultsLength = parseInt(this.showModelosResponse.total_row);
          // console.log(this.showModelosResponse)
          return this.showModelosResponse.modelos;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          // console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.modelos = data
        this.dataSource = new MatTableDataSource(this.modelos);
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
      case 'DESAFILIADO':
      default:
        return "desaffiliate"
    }
  }

  disable(modelo: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      modelo_id: this.crypto.encryptJson(modelo.id),
      status_desc: this.crypto.encryptJson('DESAFILIADO'),
    }))
    this.loading = true;
    this.inventario.doChangeStatusModel(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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

  activate(modelo: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      modelo_id: this.crypto.encryptJson(modelo.id),
      status_desc: this.crypto.encryptJson('ACTIVO'),
    }))
    this.loading = true;
    this.inventario.doChangeStatusModel(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false

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
    this.inventario.doFindModels(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      // console.log(this.crypto.decryptString(res))
      this.showModelosResponse = new ShowModelosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.toaster.success(this.showModelosResponse.M)
      this.modelos = this.showModelosResponse.modelos
      this.dataSource = new MatTableDataSource(this.modelos);
    })
  }

  clear() {
    this.identifier.reset();
    this.statusFilter = false;
  }

  _editmodelos(modelos) {
    this.editModelos.emit(modelos)
  }

  saveDesativate(modelos: any) {
    this.modal.confirm("¿Desea desabilitar a esta modelos?").subscribe(result => {
      if (result) {
        this.disable(modelos)
      }
    })
  }

  saveActive(modelos: any) {
    this.modal.confirm("¿Desea Activar a esta modelos?").subscribe(result => {
      if (result) {
        this.activate(modelos)
      }
    })
  }

}
