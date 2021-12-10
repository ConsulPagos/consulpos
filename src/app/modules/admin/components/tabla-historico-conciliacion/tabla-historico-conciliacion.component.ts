import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-historico-conciliacion',
  templateUrl: './tabla-historico-conciliacion.component.html',
  styleUrls: ['./tabla-historico-conciliacion.component.scss']
})
export class TablaHistoricoConciliacionComponent implements OnInit {


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() data: any;
  @Input() columns: any;

  dataSource: MatTableDataSource<any>;

  constructor() {
    //this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }


}