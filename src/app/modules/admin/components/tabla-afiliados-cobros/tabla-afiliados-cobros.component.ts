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
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-tabla-afiliados-cobros',
  templateUrl: './tabla-afiliados-cobros.component.html',
  styleUrls: ['./tabla-afiliados-cobros.component.scss']
})
export class TablaAfiliadosCobrosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'trx', 'total', 'credito', 'estado', 'action'];
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

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

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
          return this.admin.get_affiliate_payment_orders(this.paginator.pageIndex + 1, this.id)
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

  getCreditDays(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    var diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / (1000 * 3600 * 24));
  }

}