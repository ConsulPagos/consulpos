import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ExcelReaderService } from '../../services/excel-reader.service';
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
  resultsLength: any;
  constructor(private workerService: ExcelReaderService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.resultsLength = this.data.length;
      merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.workerService.slice(this.data, this.paginator.pageIndex * 12, (this.paginator.pageIndex + 1) * 12)
            return this.workerService.finished
          }),
          catchError((e) => {
            return observableOf([]);
          })
        ).subscribe((data: any[]) => {
          console.log(data)
          this.dataSource = new MatTableDataSource(data);
        })
    }, 100);
  }


}
