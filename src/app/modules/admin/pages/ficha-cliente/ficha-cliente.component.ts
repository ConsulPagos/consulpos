import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-ficha-cliente',
  templateUrl: './ficha-cliente.component.html',
  styleUrls: ['./ficha-cliente.component.scss']
})
export class FichaClienteComponent implements OnInit {

  showClient: ClienteRequestInterface = {};

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
  }

}
