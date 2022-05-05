import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cambio-banco',
  templateUrl: './cambio-banco.component.html',
  styleUrls: ['./cambio-banco.component.scss']
})
export class CambioBancoComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Cambio Banco')
  }

  _changeBanco(change) {
    const navigationExtras: NavigationExtras = {
      state: {
        changePos: change
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-cambio-banco)", navigationExtras)
  }

}
