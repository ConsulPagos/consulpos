import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MonedasInterface } from '../../../../models/monedas';
import { Title } from '@angular/platform-browser';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { constant } from 'src/app/shared/utils/constant';
import { TipoTasasInterface } from '../../../../models/tipo_tasas';
import { ModalService } from 'src/app/shared/services/modal.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tasas',
  templateUrl: './add-tasas.component.html',
  styleUrls: ['./add-tasas.component.scss']
})
export class AddTasasComponent implements OnInit {

  tasa = '';
  monedas: MonedasInterface[];
  tipo_tasas: TipoTasasInterface[];
  loading = false;
  defaultResponse: DefaultResponse;

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private bancario: BancarioService,
    private toaster: ToasterService,
    private router: Router,
  ) { 

  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Tasa')
    this.monedas = JSON.parse(this.storage.get(constant.MONEDAS)).monedas
    this.tipo_tasas = JSON.parse(this.storage.get(constant.TIPO_TASAS)).tipo_tasas
  }

  form = new FormGroup({
    moneda: new FormControl('', [Validators.required]),
    tasa: new FormControl('', [Validators.required]),
    tipo_tasas: new FormControl('', [Validators.required]),
  });

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  clear() {
    this.form.reset();
  }

  save() {
    this.modal.confirm("Se agregara una nueva tasa y se desactivará la anterior").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      id_moneda: this.crypto.encryptJson(this.form.get('moneda').value),
      id_tipo_tasa: this.crypto.encryptJson(this.form.get('tipo_tasas').value),
      monto: this.crypto.encryptJson(this.form.get('tasa').value),
      
    }))

    this.loading = true;
    console.log("verify")
    this.bancario.doCreateTasa(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      // this.loading = false
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)
    

    switch (this.defaultResponse.R) {
      case constant.R0:
        this.toaster.success(this.defaultResponse.M)
        this.router.navigateByUrl('/admin/app/(adr:tasas)')
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
