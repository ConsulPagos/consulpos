import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private route: Router) {

  }

  affiliates(page = 1, access_level = 3) {
    var path = 'affiliates?page=' + page + '&access_level=' + access_level;
    return this.http.get(environment.apiHost + path)
  }

  mail_welcome() {
    var path = 'mail/welcome';
    return this.http.get(environment.apiHost + path)
  }
  
  mail_approved() {
    var path = 'mail/approved';
    return this.http.get(environment.apiHost + path)
  }

  mail_verificate() {
    var path = 'mail/verificate';
    return this.http.get(environment.apiHost + path)
  }
}
