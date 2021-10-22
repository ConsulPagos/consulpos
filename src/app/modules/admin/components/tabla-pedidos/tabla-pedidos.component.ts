import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TransactionInterface } from 'src/app/models/transaction';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.scss']
})
export class TablaPedidosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'trx', 'nombre_empresa', 'zona', 'estado', 'action'];
  orders = [{
    id: new Date(),
    trx: "john@gmail.com",
    nombre_empresa:"Registrar venta #200",
    zona:"127.20.23.20",
    estado:"Exitoso",
    aceptado:1
  }];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  @Output() count = new EventEmitter<number>();
  @Input() pistoleado: number;
  @Input() aceptado: number;
  @Input() cobrado: number;
  @Input() contado: number;
  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    //this.load();
    //this.firstLoading = true;
  }

  ngOnInit() {
    //this.loading = true
    //this.firstLoading = true;
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.orders(this.paginator.pageIndex + 1, this.pistoleado, this.aceptado, this.cobrado, this.contado)
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

  getCreditDays(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    var diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / (1000 * 3600 * 24));
  }

}