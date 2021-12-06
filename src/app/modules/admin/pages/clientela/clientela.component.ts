import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { ShowClientsDecrypter, ShowClientsResponse } from '../../../../models/showclients_response';

@Component({
  selector: 'app-clientela',
  templateUrl: './clientela.component.html',
  styleUrls: ['./clientela.component.scss']
})
export class ClientelaComponent implements OnInit {

  countPrimeraCompra;
  countNuevos;
  countDocumentos;
  countDocumentosReq;
  countException;
  showclientResponse: ShowClientsResponse;

  constructor(private title: Title, private router: Router, private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Clientes')
  }

  editClient(client) {
    const navigationExtras: NavigationExtras = {
      state: {
        editClient: client
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-client)", navigationExtras)
  }

  
}
