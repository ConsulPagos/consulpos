import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-reactivacion',
  templateUrl: './reactivacion.component.html',
  styleUrls: ['./reactivacion.component.scss']
})
export class ReactivacionComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Reactivacion POS')
  }

  _changePos(change) {
    const navigationExtras: NavigationExtras = {
      state: {
        changePos: change
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-reactivacion)", navigationExtras)
  }

}
