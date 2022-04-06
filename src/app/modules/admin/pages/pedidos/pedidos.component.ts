import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  countNuevos;
  pedido: any;

  constructor(
    private title:Title,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Pagos')
  }

  _addPedido(pedido) {
    const navigationExtras: NavigationExtras = {
      state: {
        addPedido: pedido
      }
    }
    console.log(pedido)
    this.router.navigateByUrl("/admin/app/(adr:add-pagos)", navigationExtras)
  }

}
