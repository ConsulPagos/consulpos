import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private scod: String

  constructor(private http: HttpClient) { }

  doAllRoll(data) {
    var path = `/user/allRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindRoll(data) {
    var path = `/user/findRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveRoll(data) {
    var path = `/user/saveRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditRoll(data) {
    var path = `/user/editRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteRoll(data) {
    var path = `/user/deleteRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doPermisosRoll(data) {
    var path = `/user/permisosRolls`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doModulosRoll(data) {
    var path = `/user/modulos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }
}
