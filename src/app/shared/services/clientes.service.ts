import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private scod: String

  constructor(private http: HttpClient) { }

  doVerificaicon(data) {
    var path = `/client/getClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSave(data) {
    var path = `/client/saveClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEdit(data) {
    var path = `/client/editClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDelete(data) {
    var path = `/client/deleteClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAll(data) {
    var path = `/client/allClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doItem(data) {
    var path = `/client/itemsByClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doStatusAccount(data) {
    var path = `/client/accountStatusByClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFind(data) {
    var path = `/client/findClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditPhone(data) {
    var path = `/client/editPhoneByClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doStatusAccountPdf(data) {
    var path = `/client/statusAccount`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'arraybuffer' })
  }

}
