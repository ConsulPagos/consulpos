import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private scod: String

  constructor(private http: HttpClient) { }

  doSale(data) {
    var path = `/sell/saveSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDesafiliateSale(data) {
    var path = `/sell/disaffiliateSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyItem(data) {
    var path = `/sell/verifyItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyStatusAccount(data) {
    var path = `/sell/verifyStatusAccount`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAllSale(data) {
    var path = `/sell/allSales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSales(data) {
    var path = `/sell/findSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSalesByStatus(data) {
    var path = `/sell/findSaleByStatus`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doOccUser(data) {
    var path = `/sell/occByUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSimModels(data) {
    var path = `/sell/simModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindPos(data) {
    var path = `/sell/findPosToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSim(data) {
    var path = `/sell/findSimToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveConfig(data) {
    var path = `/sell/salesConfig`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAutomaticAssingItem(data) {
    var path = `/sell/automaticAssingItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEndAssingItem(data) {
    var path = `/sell/endAssingItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

}
