import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { SucursalesRequestInterface } from 'src/app/models/sucursales_request';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  countNuevos;
  productos: SucursalesRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Productos')
  }

  editProductos(productos) {
    const navigationExtras: NavigationExtras = {
      state: {
        editproductos: productos
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-productos)", navigationExtras)
  }

}
