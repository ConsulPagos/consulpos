import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SaleRequestInterface } from 'src/app/models/sales';

@Component({
  selector: 'app-ficha-sale',
  templateUrl: './ficha-sale.component.html',
  styleUrls: ['./ficha-sale.component.scss']
})
export class FichaSaleComponent implements OnInit {


  showSale: SaleRequestInterface = {};
  loading: boolean;

  constructor(
    private title: Title,
    private router: Router,
    public dialog: MatDialog,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.showSale
    ) {
      this.showSale = this.router.getCurrentNavigation().extras.state.showSale as SaleRequestInterface;
      console.log(this.showSale)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:ventas)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Venta')
  }

}
