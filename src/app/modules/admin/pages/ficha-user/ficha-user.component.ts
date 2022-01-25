import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserRequestInterface } from 'src/app/models/user_request';

@Component({
  selector: 'app-ficha-user',
  templateUrl: './ficha-user.component.html',
  styleUrls: ['./ficha-user.component.scss']
})
export class FichaUserComponent implements OnInit {

  showUser: UserRequestInterface = {};
  loading: boolean;

  constructor(
    private title: Title,
    private router: Router,
    public dialog: MatDialog,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.showUser
    ) {
      this.showUser = this.router.getCurrentNavigation().extras.state.showUser as UserRequestInterface;
      console.log(this.showUser)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:super-admin-panel)");
    }
   }

   ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Usuario')
  }

}
