import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ShowItemDecrypter, ShowItemResponse } from 'src/app/models/showitem';
import { VentaFirebase } from 'src/app/models/venta_firebase';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import {StatusAccountDecrypter, StatusAccountResponse} from '../../../../models/statusaccount';


@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.scss']
})
export class EstadoCuentaComponent implements OnInit {

  displayedColumns: string[] = ['serial', "concepto",'fecha', "deuda", "abono"];
  dataSource: MatTableDataSource<any>;
  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showClient: ClienteRequestInterface = {};
  loading: boolean;
  showItemClient: ShowItemResponse;
  showStatusAccount: StatusAccountResponse;
  @Input() rif

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
  ) {
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.showClient) {
      this.showClient = this.router.getCurrentNavigation().extras.state.showClient as ClienteRequestInterface;
      console.log(this.showClient) 
    } 
    // else {
    //   this.router.navigateByUrl("/admin/app/(adr:clientela)");
    // }

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Estado de Cuenta')
    this.doStatusAccount()
  }

  doStatusAccount(){
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.rif),
    }))
    this.loading = true;
    this.cliente.doStatusAccount(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.showStatusAccount = new StatusAccountDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showStatusAccount)
      this.dataSource=new MatTableDataSource(this.showStatusAccount.estado_de_cuenta.items)
      console.log(this.crypto.decryptString(res))
      // this.loading = false
      this.crypto.setKeys(this.showStatusAccount.keyS, this.showStatusAccount.ivJ, this.showStatusAccount.keyJ, this.showStatusAccount.ivS)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
