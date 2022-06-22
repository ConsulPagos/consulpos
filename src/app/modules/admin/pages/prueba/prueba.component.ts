import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title:Title,
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ventas')
  }

  showSale(sale) {
    this.router.navigateByUrl(`/admin/app/(adr:validar-prueba/${sale.number})`)
    console.log(sale);
  }

}
