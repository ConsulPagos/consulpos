import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TransactionInterface } from 'src/app/models/transaction';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tabla-super-admin',
  templateUrl: './tabla-super-admin.component.html',
  styleUrls: ['./tabla-super-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaSuperAdminComponent implements AfterViewInit, OnInit {

  expandedElement;

  displayedColumns: string[] = ['id', 'access_level', 'email'];
  users = [{
    id:1,
    access_level: 99,
    email:"john@gmail.com"
  }];

  
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  @Output() count = new EventEmitter<number>();
  @Input() id: number;
  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService, private auth: AuthService) { }

  ngAfterViewInit() {
    //this.load();
    //this.firstLoading = true;
  }

  ngOnInit() {
    //this.loading = true
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.get_admin_users(this.paginator.pageIndex + 1, this.auth.getUserId())
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
        this.users = data
      });
  }

  getAccess(access_level){
    switch (access_level) {
      case 99:
        return 'Super admin'
      case 98:
        return 'Vendedor'
      case 97:
        return 'Depositario'
    }
  }
}