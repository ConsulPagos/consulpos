import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { FraccionPagoInterface } from 'src/app/models/fraccion_pago';
import { ModeloInterface } from 'src/app/models/modelos';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-planes',
  templateUrl: './add-planes.component.html',
  styleUrls: ['./add-planes.component.scss']
})
export class AddPlanesComponent implements OnInit {

  loading = false;
  defaultResponse: DefaultResponse;

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService
    
  ) { }


  ngOnInit(): void {

  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  clear() {
    this.form.reset();
  }

  save() {
    this.modal.confirm("Se agregara un plan").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      nombre: this.crypto.encryptJson(this.form.get('name').value),
      descripcion : this.crypto.encryptJson(this.form.get('descripcion').value),
      monto: this.crypto.encryptJson(this.form.get('price').value),
    }))

    this.loading = true;
    console.log("verify")
    this.inventario.savePlan(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)

      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:planes)')
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
