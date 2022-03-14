import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { PlataformasRequestInterface } from 'src/app/models/plataformas_request';

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.scss']
})
export class PlataformasComponent implements OnInit {

  countNuevos;

  plataformas: PlataformasRequestInterface;

  constructor(
    private title: Title, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Plataformas')
  }

  editPlataformas(plataformas) {
    const navigationExtras: NavigationExtras = {
      state: {
        editplataformas: plataformas
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-plataformas)", navigationExtras)
  }

}
