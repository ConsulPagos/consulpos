import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private scod: String

  constructor(private http: HttpClient) { }

  doPaymentInput(data) {
    var path = `/pay/paymentConstructor`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSavePayment(data) {
    var path = `/pay/savePayment`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  doPaymentInfo(data) {
    var path = `/pay/paymentInfo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  doConfirmPayment(data) {
    var path = `/pay/confirmPayment`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }
}
