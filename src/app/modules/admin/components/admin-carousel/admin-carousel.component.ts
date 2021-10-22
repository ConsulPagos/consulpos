
import { Component, OnInit } from '@angular/core';
import { FormatInterface } from 'src/app/models/format';
import { OrderInterface } from 'src/app/models/order';
import { ProductInterface } from 'src/app/models/product';
import { SellInterface } from 'src/app/models/sell';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { CartService } from '../../../affiliate/services/cart.service';

@Component({
  selector: 'app-admin-carousel',
  templateUrl: './admin-carousel.component.html',
  styleUrls: ['./admin-carousel.component.scss']
})
export class AdminCarouselComponent implements OnInit {

  products: FormatInterface[];
  page = 1;
  loading = false;
  error = false;
  data;
  discount;
  errorDetails;
  currentProduct: ProductInterface;
  selectedFormat: FormatInterface;
  order: OrderInterface = {};
  productsSub;
  lastIndexSelected = 0;
  products_by_unity: FormatInterface[] = [];
  products_by_box: FormatInterface[] = [];

  CarouselOptions = { items: 1, loop: false, nav: true };
  SlideOptions = {
    center: true,
    loop: true,
    nav: true,
    items: 3,
    dots: false,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
  }
  constructor(private cart: CartService, private api: ApiService, private _toaster: ToasterService) {
  }

  ngOnInit(): void {
    if (!this.products) {
      this.load()
    }
  }

  load() {

    this.error = false;
    this.loading = true;

    this.productsSub = this.api.all_products().subscribe(data => {
      this.data = data

      if (!this.products) {
        this.products = []
      }
      this.discount = data['discount']      
      this.products_by_unity = data['products_by_unity'];
      this.products_by_box = data['products_by_box'];
      this.products = this.products_by_unity;

      this.loading = false;
    }, e => {
      this.loading = false;
      this.error = true;
      this.errorDetails = e;
    })
  }

  add(format: FormatInterface) {
    
    this.order.product = format.producto;
    this.order.format = format;
    this.order.units = 1;
    this.order.descuento = this.discount;

    var sell:SellInterface = {};
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

  setFormat(type) {
    if (type == 'UNIDAD') {
      this.products = this.products_by_unity;
    } else if ('CAJA') {
      this.products = this.products_by_box;
    }
  }

  getProductCount(format:FormatInterface){
    var order = this.cart.all().find(p => p.format.id == format.id)
    return order != null ? (order.units != 0 ? order.units : 0 ) : 0
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productsSub.unsubscribe();
  }

}
