import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ItemInterface } from 'src/app/models/item';
import { ItemEstadoCuentaInterface } from 'src/app/models/itemestadocuenta';
import { ShowItemResponse } from 'src/app/models/showitem';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { ShowItemDecrypter } from '../../../../models/showitem';
import { ModalDesafiliacionComponent } from '../modal-desafiliacion/modal-desafiliacion.component';
import { ModalDescargarEcComponent } from '../modal-descargar-ec/modal-descargar-ec.component';

@Component({
  selector: 'app-equipos-asociados',
  templateUrl: './equipos-asociados.component.html',
  styleUrls: ['./equipos-asociados.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EquiposAsociadosComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['categoria', 'marca', 'modelo', 'cod_serial', 'precio', 'status_desc', 'acciones'];
  // displayedColumns: string[] = ['marca', 'modelo', 'cod_serial', 'precio', 'acciones'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
  showSale: any = {};


  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showClient: ClienteRequestInterface = {};
  showItem: ItemInterface = {};
  loading: boolean;
  showItemClient: any = {};
  @Input() rif;
  selection = new SelectionModel<ItemEstadoCuentaInterface>(true, []);
  defaultResponse: DefaultResponse;

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private session: SesionService,
    private dialog: MatDialog,
    private toaster: ToasterService,
  ) {

    this.dataSource = new MatTableDataSource(this.showClient.solicitudes_banco);

  }

  identity = new FormGroup({
    serial: new FormControl('', [Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Estado de Cuenta')
    this.doItem()
  }

  doItem() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.rif),
    }))
    this.loading = true;
    this.cliente.doItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.showItemClient = new ShowItemDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showItemClient);
      
      this.dataSource = new MatTableDataSource(this.showItemClient.items)
    })
  }

  statusFilter = false;
  isLoadingResults = false;

  _findSim() {
    var filter = this.identity.get('serial').value
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
      this.paginator.pageIndex = 0;
    })
  }

  submit(item: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

    }))
    this.loading = true;
    this.cliente.doDelete(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      switch (this.defaultResponse.R) {
        case constant.R0:
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

  openDialog(item): void {
    const dialogRef = this.dialog.open(ModalDesafiliacionComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { serial: item.cod_serial },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  downloadSA(item): void {
    const dialogRef = this.dialog.open(ModalDescargarEcComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { rif: this.rif, serial: item.cod_serial },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }



}
