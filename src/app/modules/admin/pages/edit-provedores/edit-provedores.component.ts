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
  selector: 'app-edit-provedores',
  templateUrl: './edit-provedores.component.html',
  styleUrls: ['./edit-provedores.component.scss']
})
export class EditProvedoresComponent implements OnInit {

  loading = false;
  defaultResponse: DefaultResponse;
  editprovedores: any = {};

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
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editprovedores) {
      this.editprovedores = this.router.getCurrentNavigation().extras.state.editprovedores as any;

    } else {
      this.router.navigateByUrl("/admin/app/(adr:provedores)");
    }

    this.form = new FormGroup({
      name: new FormControl(this.editprovedores.proveedor, [Validators.required]),
      descripcion: new FormControl(this.editprovedores.descripcion, [Validators.required]),
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
      proveedor: this.crypto.encryptJson(this.form.get('name').value),
      descripcion: this.crypto.encryptJson(this.form.get('descripcion').value),
      proveedor_id: this.crypto.encryptJson(this.editprovedores.id),
    }))

    this.loading = true;
    console.log("verify")
    this.inventario.doEditProveedores(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:provedores)')
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
