import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ValidarPruebaResponse, ValidarPruebaDecrypter } from 'src/app/models/validar_prueba';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-tabla-validar-prueba',
  templateUrl: './tabla-validar-prueba.component.html',
  styleUrls: ['./tabla-validar-prueba.component.scss']
})
export class TablaValidarPruebaComponent implements OnInit {
  displayedColumns: string[] = ['equipo', 'marca', 'modelo', 'acciones'];
  countNuevos;
  client: any;
  default: ValidarPruebaResponse;
  dataSource = new MatTableDataSource<any>();
  @Input() id: any;
  constructor(
    private crypto: CryptoService,
    private ventas: VentasService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    public dialog: MatDialog,
  ) {


  }

  ngOnInit(): void {
    this.equiposPrueba()
  }

  equiposPrueba() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud: this.crypto.encryptJson(this.id),

    }))
    this.ventas.equiposPorSolicitud(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.default = new ValidarPruebaDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default.items)
      this.dataSource = new MatTableDataSource(this.default.items);
    })
  }

  validarItem(venta) {
    const navigationExtras: NavigationExtras = {
      state: {
        item: venta
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:validar-prueba-ficha)", navigationExtras)
  }


}
