import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss']
})
export class AddRolComponent implements OnInit {

  constructor(
    private title: Title,
    private modal: ModalService,

  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar rol')
  }

  form = new FormGroup({
    nameRol: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  clear() {
    this.form.reset();
  }

  save() {
    this.modal.confirm("Se agregara una nueva tasa y se desactivará la anterior").subscribe(result => {
      if (result) {
        console.log("acciones")
        // this.submit()
      }
    })
  }

  // submit() {
  //   const data = this.crypto.encryptString(JSON.stringify({
  //     u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
  //     correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
  //     scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

  //     id_moneda: this.crypto.encryptJson(this.form.get('moneda').value),
  //     id_tipo_tasa: this.crypto.encryptJson(this.form.get('tipo_tasas').value),
  //     monto: this.crypto.encryptJson(this.form.get('tasa').value),
      
  //   }))

  //   this.loading = true;
  //   console.log("verify")
  //   this.bancario.doCreateTasa(`${this.session.getDeviceId()};${data}`).subscribe(res => {
  //     console.log(data)
  //     console.log(res)
  //     console.log(this.crypto.decryptString(res))
  //     this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
  //     console.log(this.defaultResponse)
  //     // this.loading = false
  //     this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)
    

  //   switch (this.defaultResponse.R) {
  //     case constant.R0:
  //       this.toaster.success(this.defaultResponse.M)
  //       this.router.navigateByUrl('/admin/app/(adr:tasas)')
  //       break;
  //     case constant.R1:
  //       this.toaster.error(this.defaultResponse.M)
  //       break;
  //     default:
  //       this.toaster.default_error()
  //       break;
  //   }

  // })

  // }

}
