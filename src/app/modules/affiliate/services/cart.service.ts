import { Injectable } from '@angular/core';
import { OrderInterface } from 'src/app/models/order';
import { SellInterface } from 'src/app/models/sell';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orders: OrderInterface[] = [];

  constructor(private storage: StorageService) { }

  add_sell(sell: SellInterface) {
    var sells: SellInterface[] = [];

    if (localStorage.getItem('sells')) {
      sells = <SellInterface[]>JSON.parse(localStorage.getItem('sells'));
    }

    //find the sell if already exists
    var old = sells.filter(s => s.id_presentacion === sell.id_presentacion);
    if (old.length == 1) {
      old[0].unidades = sell.unidades + old[0].unidades;
    } else {
      sells.push(sell);
    }

    this.storage.store('sells', sells);
  }

  remove_sell(sell) {
    var sellStorage = <SellInterface[]>JSON.parse(localStorage.getItem('sells'));
    if (sellStorage.length > 1) {
      sellStorage = sellStorage.filter(s => s.id_presentacion !== sell.id_presentacion);
      this.storage.store('sells', sellStorage);
    } else {
      this.storage.store('sells', []);
    }
  }

  add(order: OrderInterface) {
    var orders:OrderInterface[]= []
    
    if(localStorage.getItem('orders')){
      orders = <OrderInterface[]>JSON.parse(localStorage.getItem('orders'));
    }

    //find the order if already exists
    var old = orders.find(o => o.format.id == order.format.id)
    if (old) {
      orders.find(o => o.format.id == order.format.id).units = order.units + old.units;
    } else {
      orders.push(order);
    }

    this.storage.store('orders', orders);
  }

  remove(order) {
    var storageOrders = <OrderInterface[]>JSON.parse(localStorage.getItem('orders'));
    if (storageOrders.length > 1) {
      storageOrders = storageOrders.filter(o => o.format.id !== order.format.id);
      this.storage.store('orders', storageOrders);
    } else {
      this.storage.store('orders', []);
    }
  }

  all(): OrderInterface[] {
    var orders: OrderInterface[] = [];
    if (localStorage.getItem('orders')) {
      orders = <OrderInterface[]>JSON.parse(localStorage.getItem('orders'));
    }
    return orders;
  }

  getCartCount(): number {
    return this.all().length
  }

}
