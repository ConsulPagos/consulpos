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
    var path = `/getClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSave(data) {
    var path = `/saveClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEdit(data) {
    var path = `/editClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDelete(data) {
    var path = `/deleteClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAll(data) {
    var path = `/allClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doItem(data) {
    var path = `/itemsByClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFind(data) {
    var path = `/findClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditPhone(data) {
    var path = `/editPhoneByClients`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_clientes}` + path, data, { headers: headers, responseType: 'text' })
  }

}
