import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CiudadInterface } from 'src/app/models/ciudad';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { EstadoInterface } from 'src/app/models/estado';
import { OccInterface } from 'src/app/models/occ';
import { ParroquiaInterface } from 'src/app/models/parroquia';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-sucursales',
  templateUrl: './add-sucursales.component.html',
  styleUrls: ['./add-sucursales.component.scss']
})
export class AddSucursalesComponent implements OnInit {


  loading = false;
  defaultResponse: DefaultResponse;
  // occs: OccInterface[];
  ciudades: CiudadInterface[];
  parroquias: ParroquiaInterface[];
  estados: EstadoInterface[];
  occs: OccInterface[];

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private bancario: BancarioService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService
  ) { }


  ngOnInit(): void {
    this.ciudades = JSON.parse(this.storage.get(constant.CIUDADES)).ciudades
    this.parroquias = JSON.parse(this.storage.get(constant.PARROQUIAS)).parroquias
    this.estados = JSON.parse(this.storage.get(constant.ESTADOS)).estados
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cod_postal: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    parroquia: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    pto_ref: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  clear() {
    this.form.reset();
  }

  save() {
    this.modal.confirm("Se agregara una nueva marca").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  getEstado(id: any): void {
    this.ciudades = JSON.parse(this.storage.get(constant.CIUDADES)).ciudades.filter(c => c.id_estado == id)
    this.parroquias = JSON.parse(this.storage.get(constant.PARROQUIAS)).parroquias.filter(c => c.id_municipio == id)
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      occ: this.crypto.encryptJson(this.form.get('name').value),
      cod_postal: this.crypto.encryptJson(this.form.get('cod_postal').value),
      direccion: this.crypto.encryptJson(this.form.get('direccion').value),
      localidad: this.crypto.encryptJson(this.form.get('localidad').value),
      pto_ref: this.crypto.encryptJson(this.form.get('pto_ref').value),
      email: this.crypto.encryptJson(this.form.get('email').value),
      parroquia_id: this.crypto.encryptJson(this.form.get('parroquia').value),
      ciudad_id: this.crypto.encryptJson(this.form.get('ciudad').value),

    }))

    this.loading = true;
    console.log("verify")
    this.inventario.doSaveSucursales(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      // this.loading = false
      //this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)

      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:sucursales)')
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
