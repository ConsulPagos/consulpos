import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'path';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { CrmTableInterface } from 'src/app/models/crm';
import { TransactionInterface } from 'src/app/models/transaction';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nombre_empresa', 'facturado', 'cantidad_compras', 'ultima_compra', 'action'];
  affiliates: CrmTableInterface[] = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = true;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private title:Title, private admin: AdminService, private api: ApiService, public dialog: MatDialog, private toaster: ToasterService) { }

  ngAfterViewInit() {
    this.load();
  }

  ngOnInit() {
    this.loading = true;
    this.title.setTitle('Grupo Altius | CRM')
  }


  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.get_crm_table(this.paginator.pageIndex + 1)
        }),
        map(data => {
          this.loading = false;
          this.resultsLength = data['total_count'];
          this.paginator.pageIndex = data['current_page'] - 1;
          return data['data'];
        }),
        catchError(() => {
          this.loading = false;
          this.error = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.affiliates = data
      });
  }

  getDate(str){
    return new Date(str)
  }

  dump(){
    this.admin.dump_crm();
  }
}
