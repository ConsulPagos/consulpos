import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-edit-plataformas',
  templateUrl: './edit-plataformas.component.html',
  styleUrls: ['./edit-plataformas.component.scss']
})
export class EditPlataformasComponent implements OnInit {

  loading = false;
  defaultResponse: DefaultResponse;
  editplataformas: any = {};

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
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editplataformas) {
      this.editplataformas = this.router.getCurrentNavigation().extras.state.editplataformas as any;

    } else {
      this.router.navigateByUrl("/admin/app/(adr:plataformas)");
    }

    this.form = new FormGroup({
      plataforma: new FormControl(this.editplataformas.plataforma, [Validators.required]),
      descripcion: new FormControl(this.editplataformas.descripcion, [Validators.required]),
    });
  }


  ngOnInit(): void {

  }

  form: FormGroup;

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

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      plataforma: this.crypto.encryptJson(this.form.get('plataforma').value),
      descripcion: this.crypto.encryptJson(this.form.get('descripcion').value),
      id_plataforma: this.crypto.encryptJson(this.editplataformas.id_plataforma),

    }))

    this.loading = true;
    console.log("verify")
    this.inventario.doEditPlataformas(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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
          this.router.navigateByUrl('/admin/app/(adr:plataformas)')
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
