import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cambio-pos',
  templateUrl: './cambio-pos.component.html',
  styleUrls: ['./cambio-pos.component.scss']
})
export class CambioPosComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Cambio POS')
  }

  _changePos(change) {
    const navigationExtras: NavigationExtras = {
      state: {
        changePos: change
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-cambio-pos)", navigationExtras)
  }

}
