import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { SucursalesRequestInterface } from 'src/app/models/sucursales_request';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.scss']
})
export class ModelosComponent implements OnInit {

  countNuevos;

  sucursales: SucursalesRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | modelos')
  }

  editModelos(modelos) {
    const navigationExtras: NavigationExtras = {
      state: {
        editmodelos: modelos
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-modelos)", navigationExtras)
  }

}
