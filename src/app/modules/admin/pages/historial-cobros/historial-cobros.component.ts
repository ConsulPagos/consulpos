import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-historial-cobros',
  templateUrl: './historial-cobros.component.html',
  styleUrls: ['./historial-cobros.component.scss']
})
export class HistorialCobrosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['created_at', 'id_pedido', 'id_transaccion', 'factura', 'total','cash_recibido', 'id_medio_pago', 'admin'];
  payments = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;

  }

  ngOnInit() {
    this.loading = true;
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.get_payments(this.paginator.pageIndex + 1)
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
        this.payments = data
      });
  }

  dump() {
    this.admin.dump_payments();
  }

}
