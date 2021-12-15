import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsulposService {

  //https://us-central1-inventario-95201.cloudfunctions.net/getSalesForValidation

  constructor(private http: HttpClient) { }

  getSalesList() {
    var path = `https://us-central1-inventario-95201.cloudfunctions.net/getSalesForValidation`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get(path, { headers: headers, responseType: 'json' })
  }

  getSale(data) {
    var path = `https://us-central1-inventario-95201.cloudfunctions.net/getSaleInfo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return this.http.post(path, data, { headers: headers, responseType: 'json' })
  }
}
