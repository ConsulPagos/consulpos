import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { IngresoInterface } from 'src/app/models/ingreso';
import { TransactionInterface } from 'src/app/models/transaction';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['created_at', 'producto', 'factura', 'cantidad_cajas', 'unidades_caja','unidades'];
  entries = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;


  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, private api: ApiService, public dialog: MatDialog, private toaster: ToasterService) { }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;

  }

  ngOnInit(){
   this.loading = true;
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.get_entries(this.paginator.pageIndex + 1)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = data['total_count'];
          this.paginator.pageIndex = data['current_page'] - 1;
          return data['data'];
        }),
        catchError(() => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.entries = data
      });
  }

  dump(){
    this.admin.dump_entries();
  }

}
