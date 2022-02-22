import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private scod: String

  constructor(private http: HttpClient) { }

  doAllUser(data) {
    var path = `/allUsers`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindUser(data) {
    var path = `/findUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveUser(data) {
    var path = `/saveUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditUser(data) {
    var path = `/editUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteUser(data) {
    var path = `/deleteUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditPermisos(data) {
    var path = `/editPermisos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }
}
