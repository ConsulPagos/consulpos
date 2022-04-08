import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowInventarioDetalleDecrypter, ShowInventarioDetalleResponse } from 'src/app/models/showinventariodetalle_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-inventario-detalle',
  templateUrl: './inventario-detalle.component.html',
  styleUrls: ['./inventario-detalle.component.scss']
})
export class InventarioDetalleComponent implements OnInit {

  id: string;
  isLoadingResults = false;
  showInventarioResponse: ShowInventarioDetalleResponse;
  inventarios = {};

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.id = params['id']);
    this.showDetalle(this.id)
  }

  showDetalle(id) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      id: this.crypto.encryptJson(id),
    }))
    this.isLoadingResults = true;

    console.log(data)
    this.inventario.doDetalleAlmacen(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      this.showInventarioResponse = new ShowInventarioDetalleDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showInventarioResponse)
      this.isLoadingResults = false;
      this.inventarios = this.showInventarioResponse.inventario
    })
  }


}
