import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SaleRequestInterface } from 'src/app/models/sales';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ficha-cambio-equipo',
  templateUrl: './ficha-cambio-equipo.component.html',
  styleUrls: ['./ficha-cambio-equipo.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FichaCambioEquipoComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cod_serial', 'marca', 'modelo', 'precio'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;

  changePos: any = {};
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
      this.router.getCurrentNavigation().extras.state.changePos
    ) {
      this.changePos = this.router.getCurrentNavigation().extras.state.changePos as any;
      console.log(this.changePos)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:cambio-pos)");
    }

    this.dataSource = new MatTableDataSource(this.changePos.solicitud_items);

  }


  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Cambio POS')
  }

}
