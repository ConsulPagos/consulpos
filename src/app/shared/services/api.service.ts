import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProductInterface } from 'src/app/models/product';
import { AddressInterface } from 'src/app/models/address';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private route: Router) {}
  
  products_carousel() {
    var path = 'products/carousel';
    return this.http.get(environment.apiHost + path)
  }

  products(page = 1, active=1) {
    var path = 'products?page='+ page +'&active=' + active;
    return this.http.get(environment.apiHost + path)
  }

  all_products() {
    var path = 'products/all'
    return this.http.get(environment.apiHost + path)
  }

  get_product(id) {
    var path = 'products/' + id
    return this.http.get<ProductInterface>(environment.apiHost + path)
  }
  transactions(id, page = 1) {
    var path = `affiliates/${id}/transactions?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  affiliate_details(id) {
    var path = `affiliates/${id}/details`;
    return this.http.get(environment.apiHost + path)
  }

  get_affiliate(id) {
    var path = `affiliates/${id}`;
    return this.http.get(environment.apiHost + path)
  }

  add_transaction(data) {
    var path = `transactions`;
    return this.http.post(environment.apiHost + path, data)
  }

  get_transaction(id, id_afiliado) {
    var path = `affiliates/${id_afiliado}/transactions/${id}`;
    return this.http.get(environment.apiHost + path)
  }

  new_affiliate_details(details) {
    var path = `affiliates`;
    return this.http.post(environment.apiHost + path, details)
  }

  update_affiliate_details(details) {
    var path = `affiliates`;
    return this.http.put(environment.apiHost + path, details)
  }

  requets_exception(id) {
    var path = `affiliates/exception`;
    return this.http.put(environment.apiHost + path, { 'id_afiliado': id })
  }

  orders(id, page = 1) {
    var path = `affiliates/${id}/orders?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  add_order(data) {
    var path = `orders`;
    return this.http.post(environment.apiHost + path, data)
  }

  get_order(id, id_afiliado) {
    var path = `affiliates/${id_afiliado}/orders/${id}`;
    return this.http.get(environment.apiHost + path)
  }

  update_affiliate_address(address: AddressInterface) {
    var path = `affiliates/${address.id_afiliado}/addresses/${address.id}`;
    return this.http.put(environment.apiHost + path, address)
  }

  new_affiliate_address(address: AddressInterface) {
    var path = `affiliates/${address.id_afiliado}/addresses`;
    return this.http.post(environment.apiHost + path, address)
  }

  delete_affiliate_address(address: AddressInterface) {
    var path = `affiliates/${address.id_afiliado}/addresses/${address.id}`;
    return this.http.delete(environment.apiHost + path)
  }

  get_zones(){
    var path = `zones`;
    return this.http.get(environment.apiHost + path)
  }

  get_payment_methods(){
    var path = `payment/methods`;
    return this.http.get(environment.apiHost + path)
  }

  get_affiliate_status(id){
    var path = `affiliates/${id}/check-status`;
    return this.http.get(environment.apiHost + path)
  }
}

