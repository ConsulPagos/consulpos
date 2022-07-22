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
import { ShowPlataformasResponse, ShowPlataformasDecrypter } from 'src/app/models/showplataformas_response';
import { PedidosResponse, PedidosDecrypter } from 'src/app/models/pedidos_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.scss']
})
export class TablaPedidosComponent implements OnInit {

  displayedColumns: string[] = ['fecha','modelo', 'numero_orden','proveedor','total'];
  plataforma = [];

  isLoadingResults = false;


  @Output() count = new EventEmitter<number>();
  @Output() editPlataformas = new EventEmitter<any>();
  defaultResponse: DefaultResponse;
  pedidosResponse:PedidosResponse
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  showPlataformasResponse: ShowPlataformasResponse;
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
    this.dataSource = new MatTableDataSource(this.plataforma);
  }

  identifier = new FormGroup({
    plataforma: new FormControl(''),
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
          return this.inventario.doListarPedidos(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.pedidosResponse = new PedidosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          // //this.crypto.setKeys(this.showPlataformasResponse.keyS, this.showPlataformasResponse.ivJ, this.showPlataformasResponse.keyJ, this.showPlataformasResponse.ivS)
          this.resultsLength = parseInt(this.pedidosResponse.total_row);
          // console.log(this.showPlataformasResponse)
          return this.pedidosResponse.pedidos;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          // console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.plataforma = data
        this.dataSource = new MatTableDataSource(this.plataforma);
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

  disable(client: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(client.rif),
      status: this.crypto.encryptJson('NO ACTIVO'),
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
    this.inventario.doEncontrarPedidos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      // console.log(this.crypto.decryptString(res))
      this.showPlataformasResponse = new ShowPlataformasDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.plataforma = this.showPlataformasResponse.plataformas
      this.dataSource = new MatTableDataSource(this.plataforma);
    })
  }

  clear() {
    this.identifier.reset();
    this.statusFilter = false;
  }

  _editPlataformas(plataforma) {
    this.editPlataformas.emit(plataforma)
  }

  saveDesativate(plataforma: any) {
    this.modal.confirm("¿Desea desabilitar a esta plataforma?").subscribe(result => {
      if (result) {
        this.disable(plataforma)
      }
    })
  }

  saveActive(plataforma: any) {
    this.modal.confirm("¿Desea Activar a esta plataforma?").subscribe(result => {
      if (result) {
        this.activate(plataforma)
      }
    })
  }

}
