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
import { PagosManualDecrypter, PagosManualResponse } from 'src/app/models/pagos_manual';
import { ShowSalesDecrypter, ShowSalesResponse } from 'src/app/models/showsales_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalPagoComponent } from '../modal-pago/modal-pago.component';

@Component({
  selector: 'app-tabla-pago-pendiente',
  templateUrl: './tabla-pago-pendiente.component.html',
  styleUrls: ['./tabla-pago-pendiente.component.scss']
})
export class TablaPagoPendienteComponent implements OnInit {


  displayedColumns: string[] = ['number', 'rif','razon_social','serial','tipo','Acciones'];
  pagos = [];

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
  PAGESIZE = 25;

  @Output() addPay = new EventEmitter<any>();
  ShowSalesResponse: PagosManualResponse;

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
    private pago: PagosService
  ) 
  {
    this.dataSource = new MatTableDataSource(this.pagos);
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
          this.loader.loading()
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            init_row: this.crypto.encryptJson(((this.paginator.pageIndex * this.PAGESIZE)).toString()),
            limit_row: this.crypto.encryptJson((this.PAGESIZE).toString()),
            status_desc: this.crypto.encryptJson("EN ESPERA DE PAGO"),
          }))
          return this.pago.pagosPendientes(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.ShowSalesResponse = new PagosManualDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
           //this.crypto.setKeys(this.ShowSalesResponse.keyS, this.ShowSalesResponse.ivJ, this.ShowSalesResponse.keyJ, this.ShowSalesResponse.ivS)
          this.resultsLength = parseInt(this.ShowSalesResponse.total_row);
          console.log(this.ShowSalesResponse)
          this.loader.stop()
          return this.ShowSalesResponse.pagos;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.pagos = data
        this.dataSource = new MatTableDataSource(this.pagos);
        this.identity.reset();
        this.statusFilter = false;
      });
  }

  _findClient() {
    var filter = this.identity.get('rif').value
    this.statusFilter = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      status_desc: this.crypto.encryptJson('EN ESPERA DE PAGO'),
      filter: this.crypto.encryptJson(filter),
    }))

    this.pago.pagosPendientesPorCliente(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      this.ShowSalesResponse = new PagosManualDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
       //this.crypto.setKeys(this.ShowSalesResponse.keyS, this.ShowSalesResponse.ivJ, this.ShowSalesResponse.keyJ, this.ShowSalesResponse.ivS)
      this.pagos = this.ShowSalesResponse.pagos
      this.dataSource = new MatTableDataSource(this.pagos);
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
