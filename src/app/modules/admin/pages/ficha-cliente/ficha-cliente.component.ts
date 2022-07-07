import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ShowItemDecrypter, ShowItemResponse } from 'src/app/models/showitem';
import { TelefonoInterface } from 'src/app/models/telefono';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from 'src/app/models/validacioncliente_response';
import { EditFieldDialogComponent } from 'src/app/shared/components/edit-field-dialog/edit-field-dialog.component';
import { EditphoneComponent } from 'src/app/shared/components/editphone/editphone.component';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { StatusAccountDecrypter, StatusAccountResponse } from '../../../../models/statusaccount';

@Component({
  selector: 'app-ficha-cliente',
  templateUrl: './ficha-cliente.component.html',
  styleUrls: ['./ficha-cliente.component.scss']
})
export class FichaClienteComponent implements OnInit {

  displayedColumns: string[] = ['venta', 'afiliado', 'banco', 'cuenta'];

  showClient: ClienteRequestInterface = {
    solicitudes_banco: undefined
  };
  loading: boolean;
  showItemClient: ShowItemResponse;
  validacionCliente: ValidacionclienteResponse;
  showStatusAccount: StatusAccountResponse;
  telefonos: TelefonoInterface;
  a: any;

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    public dialog: MatDialog,
    private loader: LoaderService,
    private venta: VentasService,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.showClient
    ) {
      this.showClient = this.router.getCurrentNavigation().extras.state.showClient as ClienteRequestInterface;
      //console.log(this.showClient)
      this.a = this.showClient.solicitudes_banco
      console.log(this.a)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:clientela)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Cliente')
    this.doItem()
    // this.doStatusAccount()
  }

  doItem() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.showClient.rif),
    }))
    console.log(this.showClient.rif)
    this.loading = true;
    this.cliente.doItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.showItemClient = new ShowItemDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showItemClient)
      console.log(this.crypto.decryptString(res))

    })
  }

  openDialog(phone): void {

    const dialogRef = this.dialog.open(EditphoneComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { field: "Editar Telefono", value: this.showClient.telefonos },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.doEditPhone(result)
      }
      this.router.navigateByUrl("/admin/app/(adr:clientela)");
    });
  }

  doEditPhone(phone) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.showClient.rif),
      telefonos: this.crypto.encryptJson(JSON.stringify([
        {
          number: phone.phone_1.number,
          cod_area: phone.phone_1.dialCode,
          iso: phone.phone_1.countryCode,
          telefono_id: phone.phone_1_id,
        },
        {
          number: phone.phone_2.number,
          cod_area: phone.phone_2.dialCode,
          iso: phone.phone_2.countryCode,
          telefono_id: phone.phone_2_id,
        },

      ]))
    }))
    console.log(this.showClient.rif)
    this.loader.loading()
    this.cliente.doEditPhone(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.validacionCliente = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionCliente)
      console.log(this.crypto.decryptString(res))
      this.loader.stop()
    })
  }

}
