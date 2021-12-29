import { Title } from '@angular/platform-browser';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsulposService } from "../../../../shared/services/consulpos.service";
import { VentaFirebase } from "../../../../models/venta_firebase";



@Component({
  selector: 'app-venta-consulpos',
  templateUrl: './venta-consulpos.component.html',
  styleUrls: ['./venta-consulpos.component.scss'],
})
export class VentaConsulposComponent implements OnInit {

  displayedColumns: string[] = ['rif', "razon",'estatus', "fecha", "total_usd", "acciones"];
  dataSource: MatTableDataSource<VentaFirebase>;
  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private title: Title, private consulpos: ConsulposService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ventas Consulpos')
    this.consulpos.getSalesList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data as VentaFirebase[]);
      this.countNuevos = (data as VentaFirebase[]).length;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

