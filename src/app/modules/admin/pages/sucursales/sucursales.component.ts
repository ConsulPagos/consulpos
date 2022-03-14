import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { SucursalesRequestInterface } from 'src/app/models/sucursales_request';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  countNuevos;

  sucursales: SucursalesRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Sucursales')
  }

  editSucursal(sucursales) {
    const navigationExtras: NavigationExtras = {
      state: {
        editsucursales: sucursales
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-sucursales)", navigationExtras)
  }

}
