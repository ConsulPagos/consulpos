import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  countNuevos;
  planes: any;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Plataformas')
  }

  deletePlan(planes) {
    const navigationExtras: NavigationExtras = {
      state: {
        deletePlan: planes
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:plan)", navigationExtras)
  }


}
