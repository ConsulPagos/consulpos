import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-desinstalacion',
  templateUrl: './desinstalacion.component.html',
  styleUrls: ['./desinstalacion.component.scss']
})
export class DesinstalacionComponent implements OnInit {

  countNuevos;

  client: any;

  constructor(
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Desinstalacion POS')
  }

  _changePos(change) {
    const navigationExtras: NavigationExtras = {
      state: {
        changePos: change
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-desinstalacion)", navigationExtras)
  }

}
