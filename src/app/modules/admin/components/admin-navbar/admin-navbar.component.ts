import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  identity = '';
  state = '';

  constructor(private auth:AuthService) { 
    this.identity = this.auth.getIdentity();
    this.state = this.auth.getState();
  }

  ngOnInit(): void {
  }

  loggout(){
    this.auth.loggout();
  }
}

