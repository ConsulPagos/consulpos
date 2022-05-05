import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DefaultResponse } from 'src/app/models/default_response';
import { ShowSalesDecrypter, ShowSalesResponse } from 'src/app/models/showsales_response';
import { ShowSolicitudesResponse, ShowSolicitudesDecrypter } from 'src/app/models/showsolicitudes_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
@Component({
  selector: 'app-tabla-cambio-sim',
  templateUrl: './tabla-cambio-sim.component.html',
  styleUrls: ['./tabla-cambio-sim.component.scss']
})
export class TablaCambioSimComponent implements OnInit {

  displayedColumns: string[] = ['number', 'rif', 'razon_social', 'fecha'];
  solicitudes = [];

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
  PAGESIZE = 25;

  @Output() editSale = new EventEmitter<any>();
  @Output() showSale = new EventEmitter<any>();
  ShowSalesResponse: ShowSolicitudesResponse;

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private venta: VentasService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
  ) { }

  identity = new FormGroup({
    rif: new FormControl(''),
  });

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
            limit_row: this.crypto.encryptJson((this.PAGESIZE).toString()),
            t_sol_id: this.crypto.encryptJson("6"),
          }))
          return this.venta.solicitudesPorTipo(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          this.isLoadingResults = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.ShowSalesResponse = new ShowSolicitudesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.resultsLength = parseInt(this.ShowSalesResponse.total_row);
          console.log(this.ShowSalesResponse)
          return this.ShowSalesResponse.solicitudes;
        }),
        catchError((e) => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.solicitudes = data
        this.dataSource = new MatTableDataSource(this.solicitudes);
        this.statusFilter = false;
      });
  }

  _findSale() {
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
      this.ShowSalesResponse = new ShowSolicitudesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.isLoadingResults = false;
      this.solicitudes = this.ShowSalesResponse.solicitudes
      this.dataSource = new MatTableDataSource(this.solicitudes);
    })
  }

}
