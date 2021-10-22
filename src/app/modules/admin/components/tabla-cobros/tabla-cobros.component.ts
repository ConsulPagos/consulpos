import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TransactionInterface } from 'src/app/models/transaction';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-tabla-cobros',
  templateUrl: './tabla-cobros.component.html',
  styleUrls: ['./tabla-cobros.component.scss']
})
export class TablaCobrosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'nombre_empresa', 'cantidad_por_cobrar', 'cantidad_vencidos','monto_adeudado', 'action'];
  orders = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  @Output() count = new EventEmitter<number>();
  @Input() solventes: number;
  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, public dialog: MatDialog) { }

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
          return this.admin.getAffiliatesChargesStatus(this.paginator.pageIndex + 1, this.solventes)
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
    this.admin.dump_orders();
  }

}