import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TransactionInterface } from 'src/app/models/transaction';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-salida-pedidos',
  templateUrl: './salida-pedidos.component.html',
  styleUrls: ['./salida-pedidos.component.scss']
})
export class SalidaPedidosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'trx', 'nombre_empresa', 'zona', 'estado', 'action'];
  orders = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;

  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, private title: Title) { }
  ngOnInit(): void {
    this.title.setTitle('Grupo Altius | Salidas');
    this.loading = true;
  }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.get_delivery_orders(this.paginator.pageIndex + 1)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = data['total_count'];
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
}