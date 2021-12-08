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


}
