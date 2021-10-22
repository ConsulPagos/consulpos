import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TransactionInterface } from 'src/app/models/transaction';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tabla-afiliados-crm',
  templateUrl: './tabla-afiliados-crm.component.html',
  styleUrls: ['./tabla-afiliados-crm.component.scss']
})
export class TablaAfiliadosCrmComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id','id_transaccion','total', 'estado', 'action'];
  orders = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  @Output() count = new EventEmitter<number>();
  @Input() id: number;
  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, private api:ApiService) { }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
  }

  ngOnInit() {
    this.loading = true
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.api.orders(this.id, this.paginator.pageIndex + 1)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = data['total_count'];
          this.count.emit(data['total_count'])
          this.paginator.pageIndex = data['current_page'] - 1;
          return data['data'];
        }),
        catchError(e => {
          this.firstLoading = false;
          this.loading = false;

          if (e && e.status == 404) {
            this.error = false;
          } else {
            this.error = true;
          }

          return observableOf([]);
        })
      ).subscribe(data => {
        this.orders = data
      });
  }

  dump() {
    //this.admin.dump_orders();
  }

}