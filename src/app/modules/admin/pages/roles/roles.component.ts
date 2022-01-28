import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  countNuevos;

  constructor(
    private title: Title,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Roles')
  }

  editRol(rol) {
    const navigationExtras: NavigationExtras = {
      state: {
        editRol: rol
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-rol)", navigationExtras)
  }

}
