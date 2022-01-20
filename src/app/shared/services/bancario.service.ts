import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancarioService {

  constructor(private http: HttpClient) { }

  doGeneracion(data) {
    var path = `/doGeneracion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetArchivos(data) {
    var path = `/doGetArchivos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doConciliacion(data) {
    var path = `/doConciliacion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetTasas(data) {
    var path = `/doGetTasas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCreateTasa(data) {
    var path = `/doCreateTasa`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doUpdateEC(data) {
    var path = `/doUpdateEC`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetArchivo(data) {
    var path = `/doGetArchivo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetHistoricoConciliacion(data) {
    var path = `/doGetHistoricoConciliacion`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetPlantillaRespuesta(data) {
    var path = `/doGetPlantillaRespuesta`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDiferir(data) {
    var path = `/doDiferir`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doGetClientList(data) {
    var path = `/doGetClientList`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doUpdateClientList(data) {
    var path = `/doUpdateClientList`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }

  
  doConciliarCC(data) {
    var path = `/doConciliarCC`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_bancario}` + path, data, { headers: headers, responseType: 'text' })
  }


}
