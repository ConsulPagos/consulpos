import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { SucursalesRequestInterface } from 'src/app/models/sucursales_request';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  countNuevos;

  sucursales: SucursalesRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | marcas')
  }

  editMarcas(marcas) {
    const navigationExtras: NavigationExtras = {
      state: {
        editmarcas: marcas
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-marcas)", navigationExtras)
  }

}
