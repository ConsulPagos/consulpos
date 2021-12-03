import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

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

  constructor(private title: Title, private router: Router) { }

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
