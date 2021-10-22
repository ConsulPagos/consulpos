import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/models/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from '../../services/cart.service'
import { OrderInterface } from 'src/app/models/order';
import { FormatInterface } from 'src/app/models/format';
import { SellInterface } from 'src/app/models/sell';
import { ToasterService } from 'src/app/shared/services/toaster.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  product: ProductInterface;
  formats: FormatInterface[];
  error = false;
  loading = false;
  order: OrderInterface = {};
  discount = null;
  //formats options
  selectedFormat: FormatInterface;

  //input quantity
  unity_quantity = 0;

  errorDetails;

  constructor(private cart: CartService, private api: ApiService, private routes: ActivatedRoute, private _toaster: ToasterService) { }

  ngOnInit(): void {
    this.load();
  }

  add() {
    this.order.product = this.product;
    this.order.format = this.selectedFormat;
    this.order.descuento = this.discount;

    var sell: SellInterface = {};
    sell.id = null;
    sell.created_at = null;
    sell.updated_at = null;
    sell.id_transaccion = null;
    sell.id_presentacion = this.order.format.id;
    sell.unidades = this.order.units;

    this.cart.add_sell(sell);
    this.cart.add(this.order);
    this._toaster.success('Agregado al carrito');
  }

  load() {
    var id = parseInt(this.routes.snapshot.paramMap.get('id'))
    this.error = false;
    this.loading = true;
    this.api.get_product(id).subscribe(data => {
      this.product = data['product'];
      this.formats = data['available_formats'];
      this.formats = this.formats.reverse()
      this.selectedFormat = this.formats[0];
      this.discount = data['discount'];

    }, e => {
      this.loading = false;
      this.error = true;
      this.errorDetails = e;
    });
  }

  updateCount(count) {
    this.order.units = count;
  }

  setFormat(new_format) {
    this.selectedFormat = new_format;
  }


}
