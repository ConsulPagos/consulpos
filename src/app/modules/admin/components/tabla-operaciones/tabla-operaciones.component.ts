import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ShowSalesDecrypter, ShowSalesResponse } from 'src/app/models/showsales_response';
import { ConfigresponseDecrypter, ConfigResponseResponse } from 'src/app/models/configresponse';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAsignacionComponent } from '../modal-asignacion/modal-asignacion.component';
import { ModalParametrizacionComponent } from '../modal-parametrizacion/modal-parametrizacion.component';
import { ModalConfiguracionComponent } from '../modal-configuracion/modal-configuracion.component';
import { ModalAsignacionManualComponent } from '../modal-asignacion-manual/modal-asignacion-manual.component';
import { ModalEntregaComponent } from '../modal-entrega/modal-entrega.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModalConfiguracionManualComponent } from '../modal-configuracion-manual/modal-configuracion-manual.component';

@Component({
  selector: 'app-tabla-operaciones',
  templateUrl: './tabla-operaciones.component.html',
  styleUrls: ['./tabla-operaciones.component.scss']
})
export class TablaOperacionesComponent implements OnInit {

  displayedColumns: string[] = ['number','solicitud_id', 'cod_serial','rif','razon_social', 'fecha', 'status_desc', 'solicitud','occ', 'Acciones'];

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
  PAGESIZE = 25;

  @Output() editSale = new EventEmitter<any>();
  @Output() showSale = new EventEmitter<any>();
  ShowSalesResponse: ShowSalesResponse;
  ShowSalesResponse2: ConfigResponseResponse;

  @Input() cambioOperacion: Observable<string>;
  tipo_operacion: string;

  constructor
    (
      private session: SesionService,
      private crypto: CryptoService,
      private storage: StorageService,
      private venta: VentasService,
      private loader: LoaderService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
  ) {

    this.route.paramMap.subscribe(paramMap => {
      this.tipo_operacion = paramMap.get('tipo_operacion');
    })

    this.dataSource = new MatTableDataSource(this.ventas);
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

  ngOnInit(): void {
    this.cambioOperacion.subscribe(oper => {
      if (!this.firstLoading) {
        console.log(oper)
        this.tipo_operacion = oper
        this.load()
      }
    })
  }

  openDialog(venta): void {
    switch (this.tipo_operacion) {
      case 'asignacion':
        if (venta.solicitud === "TRASPASO") {
          var dialogRef: any = this.dialog.open(ModalAsignacionManualComponent, {
            disableClose: true,
            height: 'auto',
            panelClass: 'custom-dialog',
            data: { venta: venta },
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.load()
            }
          });
        } else if (venta.solicitud === "VENTA POS" || venta.solicitud === "CAMBIO DE EQUIPO") {
          console.log('holaaaaa');
          
          var dialogRef: any = this.dialog.open(ModalAsignacionComponent, {
            disableClose: true,
            height: 'auto',
            panelClass: 'custom-dialog',
            data: { venta: venta },
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('dialog se refresco');
              
              this.load()
            }
          });
        }
        break;

      case 'parametrizacion':
        dialogRef = this.dialog.open(ModalParametrizacionComponent, {
          disableClose: true,
          height: 'auto',
          panelClass: 'custom-dialog',
          data: { venta: venta },
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.load()
          }
        });
        break;

      case 'configuracion':
        if (venta.solicitud === "TRASPASO") {
          dialogRef = this.dialog.open(ModalConfiguracionManualComponent, {
            disableClose: true,
            height: 'auto',
            panelClass: 'custom-dialog',
            data: { venta: venta },
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.load()
            }
          });
        } else if (venta.solicitud === "VENTA POS" || venta.solicitud === "CAMBIO DE SIM" || venta.solicitud === "CAMBIO DE EQUIPO") {
          dialogRef = this.dialog.open(ModalConfiguracionComponent, {
            disableClose: true,
            height: 'auto',
            panelClass: 'custom-dialog',
            data: { venta: venta },
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.load()
            }
          });
        }
        break;

      case 'entregar':
        dialogRef = this.dialog.open(ModalEntregaComponent, {
          disableClose: true,
          height: 'auto',
          panelClass: 'custom-dialog',
          data: { venta: venta },
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.load()
          }
        });
        break;

      default:
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load() {

    if( this.tipo_operacion == "asignacion" ){
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
            status_desc: this.crypto.encryptJson(this.tipo_operacion.toUpperCase()),
          }))
          return this.venta.doFindSalesByStatus(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.ShowSalesResponse = new ShowSalesDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
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

    } else {

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
            status_desc: this.crypto.encryptJson(this.tipo_operacion.toUpperCase()),
          }))
          return this.venta.itemsPendientePorEntregar(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.firstLoading = false;
          console.log("JSON: " + data)
          console.log("string: " + this.crypto.decryptString(data))
          this.ShowSalesResponse2 = new ConfigresponseDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.resultsLength = parseInt(this.ShowSalesResponse2.total_row);
          console.log(this.ShowSalesResponse2)
          this.loader.stop()
          return this.ShowSalesResponse2.equipos;
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

  }

  statusColor(status) {
    switch (status) {
      case 'ASIGNACION':
        return "asignacion"
      case 'PARAMETRIZACION':
        return "parametrizacion"
      case 'CONFIGURACION':
        return "configuracion"
      case 'ENTREGAR':
        return "entregar"
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
}
