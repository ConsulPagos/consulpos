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
    var path = `/allRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindRoll(data) {
    var path = `/findRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveRoll(data) {
    var path = `/saveRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditRoll(data) {
    var path = `/editRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteRoll(data) {
    var path = `/deleteRoll`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}:${environment.puerto_usuarios}` + path, data, { headers: headers, responseType: 'text' })
  }
}
