import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  @Output() Toggle = new EventEmitter<boolean>();

  identity = ''

  constructor(private auth: AuthService, public access: AccessService) {
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
