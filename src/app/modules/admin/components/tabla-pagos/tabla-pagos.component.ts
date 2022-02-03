import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ShowSalesDecrypter, ShowSalesResponse } from 'src/app/models/showsales_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalPagoComponent } from '../modal-pago/modal-pago.component';

@Component({
  selector: 'app-tabla-pagos',
  templateUrl: './tabla-pagos.component.html',
  styleUrls: ['./tabla-pagos.component.scss']
})
export class TablaPagosComponent implements OnInit {

  displayedColumns: string[] = ['number', 'rif','razon_social','fecha','status_desc','Acciones'];
  ventas = [];

  isLoadingResults = false;
  expandedElement: any | null;
  @Input() access_level: number;
  @Output() count = new EventEmitter<number>();
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

  @Output() addPay = new EventEmitter<any>();
  ShowSalesResponse: ShowSalesResponse;

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private venta: VentasService,
    private modal: ModalService,
    private toaster: ToasterService,
    private loader: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.ventas);
  }

  ngOnInit(): void {
  }

  identity = new FormGroup({
    rif: new FormControl(''),
  });

  ngAfterViewInit() {
    this.firstLoading = true;
    this.load()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
          this.loader.loading()
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            init_row: this.crypto.encryptJson(((this.paginator.pageIndex * this.PAGESIZE)).toString()),
            limit_row: this.crypto.encryptJson(((this.paginator.pageIndex + 1) * this.PAGESIZE).toString()),
            status_desc: this.crypto.encryptJson("EN ESPERA DE PAGO"),
          }))
          return this.venta.doFindSalesByStatus(`${this.session.getDeviceId()};${data}`)
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
          this.loader.stop()

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

  openDialogPay(id_venta: number, items: any): void {
    console.log(id_venta)


        var dialogRef = this.dialog.open(ModalPagoComponent, {
          height: 'auto',
          panelClass: 'custom-dialog',
          data: { id_venta: id_venta, items: items },
        });
        console.log(items)
        dialogRef.afterClosed().subscribe(result => {
          if (result) {

          }
        });
  }


  statusColor(status) {
    switch (status) {
      case 'EN ESPERA DE PAGO':
        return "pay"
      default:
        return "desaffiliate"
    }
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

  _addPay(pay) {
    this.addPay.emit(pay)
  }

}
