import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SaleRequestInterface } from 'src/app/models/sales';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ficha-sale',
  templateUrl: './ficha-sale.component.html',
  styleUrls: ['./ficha-sale.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class FichaSaleComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cod_serial', 'marca', 'modelo', 'precio'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;

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

    this.dataSource = new MatTableDataSource(this.showSale.solicitud_items);

  }


  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Venta')
  }

}
