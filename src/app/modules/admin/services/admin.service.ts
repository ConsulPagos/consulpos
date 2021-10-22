import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormatInterface } from 'src/app/models/format';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private toaster: ToasterService) {

  }

  affiliates(page = 1, access_level = 3) {
    var path = 'affiliates?page=' + page + '&accesslevel=' + access_level;
    return this.http.get(environment.apiHost + path)
  }

  mail_welcome(affiliate) {
    var path = 'mail/welcome';
    return this.http.post(environment.apiHost + path, affiliate)
  }

  mail_approved(affiliate) {
    var path = 'mail/approved';
    return this.http.post(environment.apiHost + path, affiliate)
  }

  mail_verificate(affiliate) {
    var path = 'mail/verificate';
    return this.http.post(environment.apiHost + path, affiliate)
  }

  transactions(page = 1) {
    var path = `affiliates/transactions?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  orders(page = 1, pistoleado = null, aceptado = null, cobrado = null, contado = null) {
    var path = `affiliates/orders?page=${page}&pistoleado=${pistoleado}&aceptado=${aceptado}&cobrado=${cobrado}&contado=${contado}`;
    return this.http.get(environment.apiHost + path)
  }

  get_delivery_orders(page = 1) {
    var path = `delivery/orders?page=${page}`;
    return this.http.get(environment.apiHost + path)
  }

  acceptOrder(order) {
    var path = 'transactions';
    return this.http.post(environment.apiHost + path, { 'order': order })
  }

  get_order(id, id_afiliado, with_affiliate) {
    var path = `affiliates/${id_afiliado}/orders/${id}?with_affiliate=` + with_affiliate;
    return this.http.get(environment.apiHost + path)
  }

  new_product(data) {
    var path = `products`;
    return this.http.post(environment.apiHost + path, data)
  }

  update_product(data, id) {
    var path = `products/${id}`;
    return this.http.put(environment.apiHost + path, data)
  }

  delete_product(id) {
    var path = `products/${id}`;
    return this.http.delete(environment.apiHost + path)
  }

  new_format(format, id) {
    var path = `products/${id}/formats`;
    return this.http.post(environment.apiHost + path, format)
  }

  update_format(format: FormatInterface, id_format, id_product) {
    var path = `products/${id_product}/formats/${id_format}`;
    return this.http.put(environment.apiHost + path, format)
  }

  delete_format(id_format, id_product) {
    var path = `products/${id_product}/formats/${id_format}`;
    return this.http.delete(environment.apiHost + path)
  }

  new_entry(entry, id) {
    var path = `products/${id}/entries`;
    return this.http.post(environment.apiHost + path, entry)
  }

  get_entries(page = 1) {
    var path = `products/entries?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  dump_inventario(format = 'xlsx', filename = 'inventario') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `stock/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente') });
  }

  dump_orders(format = 'xlsx', filename = 'pedidos') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `orders/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente') });
  }

  dump_entries(format = 'xlsx', filename = 'ingresos') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `products/entries/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente') });
  }

  downLoadFile(data, file_name) {
    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    var blob = new Blob([data], { type: contentType });
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = file_name;
    anchor.href = url;
    anchor.click();
  }

  get_product_by_barcode(barcode) {
    var path = `products/barcode/${barcode}`;
    return this.http.get(environment.apiHost + path)
  }

  new_salida(salida) {
    var path = `products/outputs`;
    return this.http.post(environment.apiHost + path, salida)
  }

  get_outputs(page = 1) {
    var path = `products/outputs?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  dump_outputs(format = 'xlsx', filename = 'salidas') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `products/outputs/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente') });
  }

  get_payments(page = 1) {
    var path = `payments?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  new_payment(payment) {
    var path = `payments`;
    return this.http.post(environment.apiHost + path, payment)
  }

  dump_payments(format = 'xlsx', filename = 'cobros') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `payments/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente') });
  }

  get_crm_table(page = 1) {
    var path = `admin/crm?page=` + page;
    return this.http.get(environment.apiHost + path)
  }

  dump_crm(format = 'xlsx', filename = 'CRM') {
    filename = filename + '_' + new Date().toLocaleDateString();
    this.toaster.progress('Descargando en formato excel')
    var path = `admin/crm/dump?format=${format}&filename=${filename}`;
    return this.http.get(environment.apiHost + path, { responseType: 'blob' }).subscribe(
      response => {
        this.downLoadFile(response, filename)
      }, e => { this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente') });
  }

  get_dashboard() {
    var path = `admin/dashboard`;
    return this.http.get(environment.apiHost + path)
  }

  get_crm_affiliate(id) {
    var path = `admin/crm/${id}`;
    return this.http.get(environment.apiHost + path)
  }

  apply_discount(id, data) {
    var path = `affiliates/${id}/discount`;
    return this.http.put(environment.apiHost + path, data)
  }

  apply_credit(id, data) {
    var path = `affiliates/${id}/credit`;
    return this.http.put(environment.apiHost + path, data)
  }

  getAffiliatesChargesStatus(page = 1, solventes = 0){
    var path = `affiliates/payments/status?page=${page}&solventes=${solventes}`;
    return this.http.get(environment.apiHost + path)
  }

  get_affilite_payment_status(id) {
    var path = `affiliates/payments/status/${id}`;
    return this.http.get(environment.apiHost + path)
  }

  get_affiliate_payment_orders(page = 1, id){
    var path = `affiliates/${id}/payments/orders?page=${page}`;
    return this.http.get(environment.apiHost + path)
  }

  get_admin_users(page = 1, id) {
    var path = `admin/users/${id}?page=${page}`;
    return this.http.get(environment.apiHost + path)
  }
  
  new_admin_users(data) {
    var path = `admin/users`;
    return this.http.post(environment.apiHost + path, data)
  }

  changePassword(data) {
    var path = `admin/password`;
    return this.http.post(environment.apiHost + path, data)
  }

  get_affiliate_shop_data(id_afiliado) {
    var path = `affiliates/${id_afiliado}/shop-data`;
    return this.http.get(environment.apiHost + path)
  }

}

