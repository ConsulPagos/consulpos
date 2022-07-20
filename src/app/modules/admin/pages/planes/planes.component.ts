import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {

  countNuevos;
  planes: any;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Planes')
  }

  deletePlanes(planes) {
    const navigationExtras: NavigationExtras = {
      state: {
        deletePlan: planes
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:planes)", navigationExtras)
  }

}
