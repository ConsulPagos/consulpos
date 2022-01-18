import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  @Output() Toggle = new EventEmitter<boolean>();

  identity = ''

  constructor(private auth: AuthService) {
    this.identity = localStorage.getItem("identity")
  }

  ngOnInit(): void {
  }

  loggout() {
    this.auth.loggout();
  }

  toggle(){
    this.Toggle.emit(true)
  }


}
