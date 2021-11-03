import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AffiliateDetailJoinInterface } from 'src/app/models/afiliado';
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-clientela-afiliados',
  templateUrl: './clientela-afiliados.component.html',
  styleUrls: ['./clientela-afiliados.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientelaAfiliadosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['rif', 'nombre_comercial', 'estatus', 'validado'];
  affiliate = [{
    rif:'J253862510',
    nombre_comercial: 'Los Perros de Joao',
    email:"cliente@gmail.com",
    estatus:'Activo',
    validado: "SI"
  }];
  
  expandedElement: AffiliateDetailJoinInterface | null;

  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<AffiliateDetailJoinInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private admin: AdminService) { }

  ngAfterViewInit() {
    //this.load();
    //this.firstLoading = true;
  }

  ngOnInit(){
    //this.loading = true;
  }
  
  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.admin.affiliates(this.paginator.pageIndex + 1, this.access_level)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = data['total_count'];
          this.count.emit(data['total_count'])
          this.paginator.pageIndex = data['current_page'] - 1;
          console.log(data)
          return data['data'];
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.affiliate = data
      });
  }
}