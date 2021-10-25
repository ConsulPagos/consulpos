import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
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

  displayedColumns: string[] = ['select','id', 'fecha', 'correo', 'razon'];
  affiliate = [{
    id: 1,
    fecha: new Date(),
    correo: "cliente@gmail.com",
    razon: "Panaderia El Portugues",
    representante: "Carlos",
    presencia_online: "www.panaderia.com",
    validado: "SI"
  },{
    id: 2,
    fecha: new Date(),
    correo: "cliente@gmail.com",
    razon: "Panaderia El Portugues",
    representante: "Carlos",
    presencia_online: "www.panaderia.com",
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
  selection = new SelectionModel<any>(true, []);

  constructor(private admin: AdminService) {
    this.dataSource = new MatTableDataSource(this.affiliate);
  }

  ngAfterViewInit() {
    //this.load();
    //this.firstLoading = true;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    //this.loading = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}