import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { ProvedoresRequestInterface } from 'src/app/models/provedores_request';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.scss']
})
export class ProvedoresComponent implements OnInit {

  countNuevos;

  provedores: ProvedoresRequestInterface;

  constructor(
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Provedores')
  }

  editProvedores(provedores) {
    const navigationExtras: NavigationExtras = {
      state: {
        editprovedores: provedores
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-provedores)", navigationExtras)
  }
}
