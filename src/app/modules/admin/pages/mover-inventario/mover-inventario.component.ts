import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { SearchPosResponse, SearchPosDecrypter } from 'src/app/models/searchpos_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PosInventarioInterface } from '../../../../models/posinventario'
import { MatDialog } from '@angular/material/dialog';
import { DiferirDeudaComponent } from '../../components/diferir-deuda/diferir-deuda.component';
import { ModalKeySoComponent } from '../../components/modal-key-so/modal-key-so.component';
import { stringify } from 'querystring';
import { ModalCambioAlmacenComponent } from '../../components/modal-cambio-almacen/modal-cambio-almacen.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mover-inventario',
  templateUrl: './mover-inventario.component.html',
  styleUrls: ['./mover-inventario.component.scss']
})
export class MoverInventarioComponent implements OnInit {

  defaultResponse: DefaultResponse;
  almacenes: any[];
  searchpos: SearchPosResponse;
  items: any[];

  displayedColumns: string[] = ['select', 'marca', "modelo", 'serial', "aplicativo", "llave", "estatus"];
  dataSource: MatTableDataSource<any>;
  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean;
  selection = new SelectionModel<PosInventarioInterface>(true, []);

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
    private ventas: VentasService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchPos()
    this.almacenes = JSON.parse(this.storage.get(constant.ALMACENES)).almacenes
  }

  form = new FormGroup({
    almacen_origen: new FormControl('', [Validators.required]),
  });

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  searchPos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      almacen_id: this.crypto.encryptJson(this.form.get('almacen_origen').value),
    }))
    this.inventario.doListarPosConfigurados(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.searchpos = new SearchPosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.dataSource = new MatTableDataSource(this.searchpos.items)
      console.log(this.searchpos)
      this.items = this.searchpos.items
    })
  }

  clear() {
    this.form.reset();
  }

  openDialogKey(): void {
    const dialogRef = this.dialog.open(ModalKeySoComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { selected: this.selection.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const items = []
        this.selection.selected.forEach((i: any) => {
          items.push({
            cod_serial: i.cod_serial,
            so: (result.so) ? "SI" : "NO",
            llave: (result.key) ? "SI" : "NO"
          })
        })
        this.submit(items)
      }
    });
  }

  openDialogMove(): void {
    const dialogRef = this.dialog.open(ModalCambioAlmacenComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { selected: this.selection.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit2(this.selection.selected, result.almacen_destino)
      }
    });
  }

  submit2(items, destino) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      items: this.crypto.encryptJson(JSON.stringify(items)),
      almacen_id: this.crypto.encryptJson(destino),
    }))

    console.log("verify")
    this.inventario.doMoverInventarioDePos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          // this.router.navigateByUrl('/admin/app/(adr:inventario)')
          this.selection.clear()
          this.searchPos()

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

  submit(items) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      items: this.crypto.encryptJson(JSON.stringify(items)),
    }))

    console.log("verify")
    this.inventario.doConfirmarConfiguracionPos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          // this.router.navigateByUrl('/admin/app/(adr:mover-inventario)')
          this.selection.clear()

          this.searchPos()
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

}
