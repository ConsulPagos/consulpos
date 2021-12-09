import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AffiliateDetailJoinInterface } from 'src/app/models/afiliado';
import { ShowClientsDecrypter } from 'src/app/models/showclients_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-clientela-afiliados',
  templateUrl: './clientela-afiliados.component.html',
  styleUrls: ['./clientela-afiliados.component.scss'],
})

export class ClientelaAfiliadosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['t_c_letra', 'rif', 'nombre_comercial', 'status_desc', 'fecha_registro', 'Acciones'];
  clientes = [];

  expandedElement: AffiliateDetailJoinInterface | null;

  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();
  @Output() editClient = new EventEmitter<any>();

  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<AffiliateDetailJoinInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  showclientResponse: any;
  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService) {
    this.dataSource = new MatTableDataSource(this.clientes);
  }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    /*     this.loading = true;
        this.load(); */
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
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            limit_row: this.crypto.encryptJson("25"),
            init_row: this.crypto.encryptJson((this.paginator.pageIndex + 1).toString()),
          }))
          return this.cliente.doAll(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = 100;
          // this.count.emit(25)
          // this.paginator.pageIndex = 1;
          console.log("JSON: " + data)
          this.showclientResponse = new ShowClientsDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          console.log(this.showclientResponse)
          this.crypto.setKeys(this.showclientResponse.keyS, this.showclientResponse.ivJ, this.showclientResponse.keyJ, this.showclientResponse.ivS)
          return this.showclientResponse.clientes;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.clientes = data
        this.dataSource = new MatTableDataSource(this.clientes);
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

  statusColor(status) {
    switch (status) {
      case 0:
        return "desaffiliate"
      case 1:
      default:
        return "active"
    }
  }

  _editClient(client) {
    this.editClient.emit(client)
    console.log(client)
  }

}