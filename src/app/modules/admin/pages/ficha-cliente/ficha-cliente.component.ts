import { Component, OnInit } from '@angular/core';
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

import {ItemRequestInterface} from '../../../../models/item_request';

@Component({
  selector: 'app-ficha-cliente',
  templateUrl: './ficha-cliente.component.html',
  styleUrls: ['./ficha-cliente.component.scss']
})
export class FichaClienteComponent implements OnInit {

  showClient: ClienteRequestInterface = {};
  loading: boolean;
  showItemClient: ShowItemResponse;

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
    } else {
      this.router.navigateByUrl("/admin/app/(adr:clientela)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Cliente')
    this.doItem()
  }

  doItem(){
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.showClient.rif),
    }))
    console.log(this.showClient.rif)
    this.loading = true;
    this.cliente.doItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.showItemClient = new ShowItemDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showItemClient)
      console.log(this.crypto.decryptString(res))
      // this.loading = false
      this.crypto.setKeys(this.showItemClient.keyS, this.showItemClient.ivJ, this.showItemClient.keyJ, this.showItemClient.ivS)
    })
  }

}
