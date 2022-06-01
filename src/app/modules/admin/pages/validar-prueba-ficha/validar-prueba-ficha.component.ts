import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SaleRequestInterface } from 'src/app/models/sales';

@Component({
  selector: 'app-validar-prueba-ficha',
  templateUrl: './validar-prueba-ficha.component.html',
  styleUrls: ['./validar-prueba-ficha.component.scss']
})
export class ValidarPruebaFichaComponent implements OnInit {


  item: any = {};

  constructor(
    private title: Title,
    private router: Router,
    public dialog: MatDialog,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.item
    ) {
      this.item = this.router.getCurrentNavigation().extras.state.item as any;
      console.log(this.item)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:prueba)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Venta')
  }


}
