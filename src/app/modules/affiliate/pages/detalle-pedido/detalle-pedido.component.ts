import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormatInterface } from 'src/app/models/format';
import { OrderInterface } from 'src/app/models/order';
import { PedidoInterface } from 'src/app/models/pedido';
import { ProductInterface } from 'src/app/models/product';
import { SellInterface } from 'src/app/models/sell';
import { TransactionInterface } from 'src/app/models/transaction';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  id;
  order: PedidoInterface;
  error = false;
  loading = false;
  errorDetails;

  constructor(private routes: ActivatedRoute,private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id'))
    this.load();
  }

  getTitle(){
    return 'número ' + this.id; 
  }

  load() {
    var id = parseInt(this.routes.snapshot.paramMap.get('id'))
    var id_afiliado = this.auth.getUserId();
    this.error = false;
    this.loading = true;
    this.api.get_order(id, id_afiliado).subscribe(data => {
      this.order = data;
    }, e => {
      this.loading = false;
      this.error = true;
      this.errorDetails = e;
    });
  }


}
