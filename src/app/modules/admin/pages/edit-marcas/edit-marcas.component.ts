import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CiudadInterface } from 'src/app/models/ciudad';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { EstadoInterface } from 'src/app/models/estado';
import { OccInterface } from 'src/app/models/occ';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-edit-marcas',
  templateUrl: './edit-marcas.component.html',
  styleUrls: ['./edit-marcas.component.scss']
})
export class EditMarcasComponent implements OnInit {

  loading = false;
  defaultResponse: DefaultResponse;
  estados: EstadoInterface[];
  ciudades: CiudadInterface[];
  occs: OccInterface[];
  editmarcas: any = {};

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
  ) { 

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editmarcas) {
      this.editmarcas = this.router.getCurrentNavigation().extras.state.editmarcas as any;

    }
    console.log(this.editmarcas)
    //  else {
    //   this.router.navigateByUrl("/admin/app/(adr:almacenes)");
    // }

    this.form = new FormGroup({
      name: new FormControl(this.editmarcas.marca, [Validators.required]),
      descripcion: new FormControl(this.editmarcas.descripcion, [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  form: FormGroup;

  clear() {
    this.form.reset();
  }

  save() {
    this.modal.confirm("Se agregara un nuevo almacén").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  getEstado(id: any): void {
    this.ciudades = JSON.parse(this.storage.get(constant.CIUDADES)).ciudades.filter(c => c.id_estado == id)
  }

  getOccs(id: any): void {
    this.occs = JSON.parse(this.storage.get(constant.OCCS)).occs.filter(c => c.id_ciudad == id)
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      marca: this.crypto.encryptJson(this.form.get('name').value),
      descripcion: this.crypto.encryptJson(this.form.get('descripcion').value),
      id_marca: this.crypto.encryptJson(this.editmarcas.id),
    }))
    this.loading = true;
    console.log("verify")
    this.inventario.doEditMarcas(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:marcas)')
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
