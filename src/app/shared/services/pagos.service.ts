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

  paymentConstructorManual(data) {
    var path = `/pay/paymentConstructorManual`;
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

  cuotasPendientes(data) {
    var path = `/pay/cuotasPendientes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  cuotasPendientesPorCliente(data) {
    var path = `/pay/cuotasPendientesPorCliente`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  diferirCuota(data) {
    var path = `/pay/diferirCuotas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  pagosPendientes(data) {
    var path = `/pay/pagosPendientes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  pagosPendientesPorCliente(data) {
    var path = `/pay/pagosPendientesPorCliente`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  doConfirmPayment(data) {
    var path = `/pay/guardarPagoManual`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }

  confirmPayment(data) {
    var path = `/pay/confirmPayment`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_pagos}` + path, data, { headers: headers, responseType: 'text' })
  }
}
