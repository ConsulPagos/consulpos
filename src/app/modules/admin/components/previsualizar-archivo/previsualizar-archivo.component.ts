import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CuotaInterface } from "../../../../models/cuota";
@Component({
  selector: 'app-previsualizar-archivo',
  templateUrl: './previsualizar-archivo.component.html',
  styleUrls: ['./previsualizar-archivo.component.scss']
})

export class PrevisualizarArchivoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() data: CuotaInterface[];
  dataSource: MatTableDataSource<CuotaInterface>;
  @Input() displayedColumns: any;
  columns: string[] = ['documento', 'cuenta', 'monto','cobrado', 'mensaje' ];

  constructor() { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  getTotalMonto() {
    return this.data.map(t => t.monto).reduce((acc, value) => acc + value, 0);
  }

  getTotalCobrado() {
    return this.data.map(t => t.cobrado).reduce((acc, value) => acc + value, 0);
  }


}
