import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponseInterface } from '../../models/token_response'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ErrorResponse } from '../../models/auth_response'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  private onSubject = new Subject<ErrorResponse>();
  public error = this.onSubject.asObservable().pipe(share());

  constructor(private http: HttpClient, private route: Router,private storage:StorageService) { }

  auth(user) {

    //this.http.post(environment.apiHost + "auth", user).subscribe(res => {

      /* var tokens: TokenResponseInterface = res;
      localStorage.setItem('user_id', tokens.id.toString());
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('identity', tokens.identity);
      localStorage.setItem('access_level', tokens.access_level);
      localStorage.setItem('state', tokens.state);
      this.storage.store('addresses', tokens.addresses) */

      //var tokens: TokenResponseInterface = res;
      localStorage.setItem('user_id', "1");
      localStorage.setItem('access_token', "");
      localStorage.setItem('refresh_token', "");
      localStorage.setItem('identity', "john@gmail.com");
      localStorage.setItem('access_level', "99");
      localStorage.setItem('state', "1");
      this.storage.store('addresses', "1")

      if (this.getAccessLevel() != 99) {
        if (this.getAccessLevel() == 1) {
          this.route.navigateByUrl("/afiliado/app/(afr:verifique-su-cuenta)")
        } else {
          this.route.navigateByUrl('/afiliado/app/(afr:portafolio)');
        }
      } else {
        this.route.navigateByUrl('/admin/app/(adr:dashboard)');
      }

    /* }, e => {

      if (e.status == 0) {
        var error: ErrorResponse = {}
        error.field = 'request'
        error.validator = 'internal'
        error.msg = 'El backend no puede ser contactado'
        this.onSubject.next(error)
      } else {
        this.onSubject.next(e.error['error'])
      }
    }); */
  }

  loggout() {
    localStorage.clear();
    this.route.navigateByUrl('/');
  }

  getAccessLevel(): number {
    return parseInt(localStorage.getItem('access_level'));
  }

  isAuth(): Boolean {
    if (localStorage.length > 0) {
      return true;
    }
    return false;
  }

  getIdentity(): string {
    return localStorage.getItem("identity");
  }

  getUserId(): string {
    return localStorage.getItem("user_id");
  }

  getState(): string {
    return localStorage.getItem("state");
  }

  refreshToken() {
    console.log('resfresh token')
    var refresh = localStorage.getItem('refresh_token');
    var headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'token': refresh
    }

    var requestOptions = {
      headers: new Headers(headerDict),
    };
    this.http.post(environment.apiHost + "refresh", requestOptions).subscribe(res => {
      localStorage.setItem('access_token', res['access_token']);
      console.log(res['access_token'])
    }, e => {
      localStorage.clear();
      this.route.navigateByUrl('/ingresar');
    });
  }

  changePassword(data) {
    var path = `password`;
    return this.http.post(environment.apiHost + path, data)
  }

}