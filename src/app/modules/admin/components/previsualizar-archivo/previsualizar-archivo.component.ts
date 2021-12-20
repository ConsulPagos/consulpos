import { Component, Input, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: CuotaInterface[];
  @Input() columns: any;  
  dataSource: MatTableDataSource<any>;

  constructor(){
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
