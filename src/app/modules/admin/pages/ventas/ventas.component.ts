import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title:Title,
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ventas')
  }

  editSale(sale) {
    const navigationExtras: NavigationExtras = {
      state: {
        editSale: sale
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-venta)", navigationExtras)
  }

  showSale(sale) {
    const navigationExtras: NavigationExtras = {
      state: {
        showSale: sale
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:ficha-sale)", navigationExtras)
  }

}
