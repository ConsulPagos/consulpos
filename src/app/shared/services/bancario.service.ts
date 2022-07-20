import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancarioService {

  constructor(private http: HttpClient) { }

  doGeneracion(data) {
    var path = `/banking/doGeneracion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetArchivos(data) {
    var path = `/banking/doGetArchivos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doConciliacion(data) {
    var path = `/banking/doConciliacion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetTasas(data) {
    var path = `/banking/doGetTasas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCreateTasa(data) {
    var path = `/banking/doCreateTasa`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doUpdateEC(data) {
    var path = `/banking/doUpdateEC`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetArchivo(data) {
    var path = `/banking/doGetArchivo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCancelarArchivo(data) {
    var path = `/banking/doCancelarArchivo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetHistoricoConciliacion(data) {
    var path = `/banking/doGetHistoricoConciliacion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetPlantillaRespuesta(data) {
    var path = `/banking/doGetPlantillaRespuesta`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDiferir(data) {
    var path = `/banking/doDiferir`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetClientList(data) {
    var path = `/banking/doGetClientList`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doUpdateClientList(data) {
    var path = `/banking/doUpdateClientList`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  
  doConciliarCC(data) {
    var path = `/banking/doConciliarCC`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetMonthByBankBalance(data) {
    var path = `/banking/doGetMonthsByBankBalance`;
    console.log(path);
    
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

}
