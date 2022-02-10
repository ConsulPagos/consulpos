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
    var path = `/saveSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDesafiliateSale(data) {
    var path = `/disaffiliateSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyItem(data) {
    var path = `/verifyItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyStatusAccount(data) {
    var path = `/verifyStatusAccount`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAllSale(data) {
    var path = `/allSales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSales(data) {
    var path = `/findSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSalesByStatus(data) {
    var path = `/findSaleByStatus`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doOccUser(data) {
    var path = `/occByUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindPos(data) {
    var path = `/findPosToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSim(data) {
    var path = `/findSimToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveConfig(data) {
    var path = `/salesConfig`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

}
