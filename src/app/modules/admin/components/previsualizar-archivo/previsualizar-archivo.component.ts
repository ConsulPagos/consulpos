import { Component, Input, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-previsualizar-archivo',
  templateUrl: './previsualizar-archivo.component.html',
  styleUrls: ['./previsualizar-archivo.component.scss']
})



export class PrevisualizarArchivoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: any[];
  @Input() columns: any;  
  dataSource: MatTableDataSource<any>;

  constructor(){
    console.log("se construye")
  }

  ngOnInit(): void {
    console.log("se incicializa")

    console.log(this.data)
    console.log(this.columns)
    this.dataSource = new MatTableDataSource(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
