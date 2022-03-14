import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { SucursalesRequestInterface } from 'src/app/models/sucursales_request';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent implements OnInit {

  countNuevos;

  almacenes: SucursalesRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | almacenes')
  }

  editAlmacenes(almacenes) {
    const navigationExtras: NavigationExtras = {
      state: {
        editAlmacenes: almacenes
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-almacenes)", navigationExtras)
  }


}
