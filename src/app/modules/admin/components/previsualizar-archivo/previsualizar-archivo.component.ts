import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CuotaInterface } from "../../../../models/cuota";
import { ModalService } from "../../../../shared/services/modal.service";
@Component({
  selector: 'app-previsualizar-archivo',
  templateUrl: './previsualizar-archivo.component.html',
  styleUrls: ['./previsualizar-archivo.component.scss']
})

export class PrevisualizarArchivoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() data: CuotaInterface[];
  dataSource: MatTableDataSource<CuotaInterface>;
  @Input() columns: any;  

  constructor(private modal:ModalService) { 
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;

  }

  getTotalMonto() {
    return this.data.map(t => t.enviado).reduce((acc, value) => acc + value, 0);
  }

  getTotalCobrado() {
    return this.data.map(t => t.cobrado).reduce((acc, value) => acc + value, 0);
  }




}
