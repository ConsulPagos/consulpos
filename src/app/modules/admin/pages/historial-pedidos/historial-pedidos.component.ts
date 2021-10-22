import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss']
})
export class HistorialPedidosComponent implements OnInit {

  constructor(private title:Title, private admin:AdminService) { }

  ngOnInit(): void {
    this.title.setTitle('Grupo Altius | Historial')
  }

  dump(){
    this.admin.dump_orders();
  }

}
