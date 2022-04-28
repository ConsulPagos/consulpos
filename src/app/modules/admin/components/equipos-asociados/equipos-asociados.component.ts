import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ItemInterface } from 'src/app/models/item';
import { ItemEstadoCuentaInterface } from 'src/app/models/itemestadocuenta';
import { ShowClientsDecrypter } from 'src/app/models/showclients_response';
import { ShowItemResponse } from 'src/app/models/showitem';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
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
  styleUrls: ['./equipos-asociados.component.scss']
})
export class EquiposAsociadosComponent implements OnInit {
  displayedColumns: string[] = ["categoria", "marca", 'modelo', "cod_serial", 'precio', 'complemento_d', 'status_desc', 'acciones'];
  dataSource: MatTableDataSource<any>;
  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showClient: ClienteRequestInterface = {};
  showItem: ItemInterface = {};
  loading: boolean;
  showItemClient: ShowItemResponse;
  @Input() rif;
  selection = new SelectionModel<ItemEstadoCuentaInterface>(true, []);
  defaultResponse: DefaultResponse;

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private bancario: BancarioService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    private dialog: MatDialog,
    private loader: LoaderService,
    private toaster: ToasterService,
    private modal: ModalService,
  ) {

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
    console.log(this.rif)
    this.loading = true;
    this.cliente.doItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.showItemClient = new ShowItemDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
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
      data: { serial:item.cod_serial },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  downloadSA(item): void {
    const dialogRef = this.dialog.open(ModalDescargarEcComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { rif: this.rif, serial:item.cod_serial },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  

}
