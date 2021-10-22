import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements  OnInit {

  nuevos_count = 0;
  pedidos_count = 0;
  aceptados_count = 0;
  contado_count = 0;
  
  constructor(private admin: AdminService, private title:Title) { }

  ngOnInit(){
    this.title.setTitle('Grupo Altius | Pedidos')
  }

 

}