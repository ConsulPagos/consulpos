import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private scod: String

  constructor(private http: HttpClient) { }

  doLogin(data) {
    var path = `/doLogin`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerify(data) {
    var path = `/doVerify`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data, { headers: headers, responseType: 'text' })
  }

  doRefresh(data) {
    var path = `/doRefresh`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data, { headers: headers, responseType: 'text' })
  }


  /* doGeneracion(data) {
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
  } */

  doGetUsuarios(data) {
    var path = `/doGetUsuarios`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data, { headers: headers, responseType: 'text' })
  }

  doLogout(data) {
    var path = `/doLogout`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data, { headers: headers, responseType: 'text' })
  }

  getSCod = () => {
    return this.scod
  }

  setSCod = (scod: String) => {
    this.scod = scod
  }

  getDeviceId(): string {
    return "admin2@gmail.com"
  }

}
