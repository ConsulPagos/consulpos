import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { PedidoInterface } from 'src/app/models/pedido';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TransactionInterface } from 'src/app/models/transaction';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  orders: PedidoInterface[];
  page = 1;
  loading = false;
  error = false;
  data;
  errorDetails;
  notFound = false;

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    if (!this.orders) {
      this.load()
    }
  }


  load() {
    this.notFound = false;
    this.error = false;
    this.loading = true;
    var id = parseInt(this.auth.getUserId());

    this.api.orders(id, this.page).subscribe(data => {

      console.log(this.orders)

      this.page = this.page + 1;

      this.data = data
      if (!this.orders) {
        this.orders = []
      }
      this.orders = this.orders.concat(data['data'])
      this.loading = false;
    }, e => {
      
      this.loading = false;
      this.error = true;
      this.errorDetails = e;

      if (e.status == 404) {
        this.notFound = true;
      }
    
    })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max && this.orders.length > 0 && !this.loading && this.data != null && this.data['next_page'] != null) {
      this.load()
    }
  }


}
