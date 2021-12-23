import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ShowItemDecrypter, ShowItemResponse } from 'src/app/models/showitem';
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
      console.log(this.crypto.decryptString(res))
      // this.loading = false
      this.crypto.setKeys(this.showStatusAccount.keyS, this.showStatusAccount.ivJ, this.showStatusAccount.keyJ, this.showStatusAccount.ivS)
    })
  }

}
