import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ShowInventarioDecrypter, ShowInventarioResponse } from 'src/app/models/showinventario_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from 'src/app/shared/services/inventario.service';

@Component({
  selector: 'app-tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.scss']
})
export class TablaInventarioComponent implements OnInit {

  @Output() count = new EventEmitter<number>();
  @Output() showInventario = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>();

  defaultResponse: DefaultResponse;
  showInventarioResponse: ShowInventarioResponse;

  displayedColumns: string[] = ['name', 'occ', 'cantidad_equipos', 'cantidad_sim','Acciones'];
  inventarios = [];

  isLoadingResults = false;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  statusFilter = false;
  PAGESIZE = 10

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
  ) {
    this.dataSource = new MatTableDataSource(this.inventarios);
  }

  identity = new FormGroup({
    rif: new FormControl('', [Validators.minLength(4), Validators.maxLength(30)])
  });

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  filtro() {
    if (this.identity.valid) {
      this._findClient()
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
          return this.inventario.doDisponibilidadAlmacen(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log(data)
          console.log(this.crypto.decryptString(data))
          this.showInventarioResponse = new ShowInventarioDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          console.log(this.showInventarioResponse)
          if (parseInt(this.showInventarioResponse.total_row) > 0) {
            this.resultsLength = parseInt(this.showInventarioResponse.total_row);
          }
          return this.showInventarioResponse.inventario;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          // console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.inventarios = data
        this.dataSource = new MatTableDataSource(this.inventarios);
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
      this.showInventarioResponse = new ShowInventarioDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.inventarios = this.showInventarioResponse.inventario
      this.dataSource = new MatTableDataSource(this.inventarios);
      this.resultsLength = parseInt(this.showInventarioResponse.total_row);
      this.paginator.pageIndex = 0;
    })
  }

  _showInventario(inventario) {
    this.showInventario.emit(inventario)
  }

  saveDesativate(inventario: any) {
    this.modal.confirm("¿Desea desabilitar a este inventario?").subscribe(result => {
      if (result) {
        this.disable(inventario)
      }
    })
  }

  saveActive(inventario: any) {
    this.modal.confirm("¿Desea Activar a este inventario?").subscribe(result => {
      if (result) {
        this.activate(inventario)
      }
    })
  }

}
