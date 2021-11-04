import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient,) { }

  doLogin(data) {
    var path = `/doLogin`;
    return this.http.post(`${environment.apiHost}:${environment.puerto_sesion}` + path, data)
  }

}
