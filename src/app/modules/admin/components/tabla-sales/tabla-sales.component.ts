import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ShowSalesDecrypter, ShowSalesResponse } from 'src/app/models/showsales_response';

@Component({
  selector: 'app-tabla-sales',
  templateUrl: './tabla-sales.component.html',
  styleUrls: ['./tabla-sales.component.scss']
})
export class TablaSalesComponent implements OnInit {

  displayedColumns: string[] = ['number','fecha','status_desc','Acciones'];
  ventas = [];

  isLoadingResults = false;
  expandedElement: any | null;
  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();
  defaultResponse: DefaultResponse;
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  statusFilter = false;
  PAGESIZE = 12;

  @Output() editSale = new EventEmitter<any>();
  @Output() showSale = new EventEmitter<any>();
  ShowSalesResponse: ShowSalesResponse;

  constructor
    (
      private session: SesionService,
      private crypto: CryptoService,
      private storage: StorageService,
      private venta: VentasService,
      private modal: ModalService,
      private toaster: ToasterService,
      private router: Router,
  ) {
    this.dataSource = new MatTableDataSource(this.ventas);
  }

  identity = new FormGroup({
    rif: new FormControl(''),
  });

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

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
          this.isLoadingResults = true;
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            init_row: this.crypto.encryptJson(((this.paginator.pageIndex * this.PAGESIZE)).toString()),
            limit_row: this.crypto.encryptJson(((this.paginator.pageIndex + 1) * this.PAGESIZE).toString()),
          }))
          return this.venta.doAllSale(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.ShowSalesResponse = new ShowSalesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.crypto.setKeys(this.ShowSalesResponse.keyS, this.ShowSalesResponse.ivJ, this.ShowSalesResponse.keyJ, this.ShowSalesResponse.ivS)
          this.resultsLength = parseInt(this.ShowSalesResponse.total_row);
          console.log(this.ShowSalesResponse)
          return this.ShowSalesResponse.ventas;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.ventas = data
        this.dataSource = new MatTableDataSource(this.ventas);
        this.identity.reset();
        this.statusFilter = false;
      });
  }

  statusColor(status) {
    switch (status) {
      case 'TRANSANDO':
        return "active"
      case 'DESAFILIADO':
      default:
        return "desaffiliate"
    }
  }

  disable(client: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(client.rif),
      status_desc: this.crypto.encryptJson('DESAFILIADO'),
    }))
    this.loading = true;
    this.venta.doDesafiliateSale(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)

      switch (this.defaultResponse.R) {
        case constant.R0:
          window.location.reload();
          this.toaster.success(this.defaultResponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.defaultResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  _findClient() {
    var filter = this.identity.get('rif').value
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('ACTIVO'),
      filter: this.crypto.encryptJson(filter),

    }))
    this.isLoadingResults = true;
    this.venta.doFindSales(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      this.ShowSalesResponse = new ShowSalesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.crypto.setKeys(this.ShowSalesResponse.keyS, this.ShowSalesResponse.ivJ, this.ShowSalesResponse.keyJ, this.ShowSalesResponse.ivS)
      this.toaster.success(this.ShowSalesResponse.M)
      this.ventas = this.ShowSalesResponse.ventas
      this.dataSource = new MatTableDataSource(this.ventas);
    })
  }

  clear() {
    this.identity.reset();
    this.statusFilter = false;
  }

  _editSale(ventas) {
    this.editSale.emit(ventas)
  }

  _showSale(ventas) {
    this.showSale.emit(ventas)
  }

  saveDesativate(ventas: any) {
    this.modal.confirm("¿Desea anular a la venta?").subscribe(result => {
      if (result) {
        this.disable(ventas)
      }
    })
  }

}
