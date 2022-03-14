import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoriaInterface } from 'src/app/models/categoria';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { MarcaInterface } from 'src/app/models/marca';
import { ValidacionMarcaResponse, ValidacionMarcaDecrypter } from 'src/app/models/validacionmarca_response';
import { ValidacionCategoriasResponse, ValidacionCategoriasDecrypter} from 'src/app/models/validacioncategoria_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-modelos',
  templateUrl: './add-modelos.component.html',
  styleUrls: ['./add-modelos.component.scss']
})
export class AddModelosComponent implements OnInit {


  loading = false;
  defaultResponse: DefaultResponse;
  marcaResponse: ValidacionMarcaResponse;
  marcas: MarcaInterface[];

  categoriaResponse: ValidacionCategoriasResponse;
  categorias: CategoriaInterface[];

  complementos = [
    {
      name: 'Si',
      id: '1'
    },
    {
      name: 'No',
      id: '0'
    }
  ]


  constructor(
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private bancario: BancarioService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
  ) { }


  ngOnInit(): void {
    this.marca()
    this.categoria()
  }

  form = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    vendible: new FormControl('', [Validators.required]),
    complemento: new FormControl('', [Validators.required]),
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

  marca() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.inventario.doListMarcas(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.marcaResponse = new ValidacionMarcaDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.marcas = JSON.parse(this.marcaResponse.marcas)
    })
  }

  categoria() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.inventario.doListCategorias(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.categoriaResponse = new ValidacionCategoriasDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.categorias = JSON.parse(this.categoriaResponse.categorias)
    })
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      precio: this.crypto.encryptJson(this.form.get('price').value),
      modelo: this.crypto.encryptJson(this.form.get('modelo').value),
      id_marca: this.crypto.encryptJson(this.form.get('marca').value),
      categoria_id: this.crypto.encryptJson(this.form.get('categoria').value),
      vendible: this.crypto.encryptJson(this.form.get('vendible').value),
      complemento: this.crypto.encryptJson(this.form.get('complemento').value),

    }))

    this.loading = true;
    console.log("verify")
    this.inventario.doSaveModels(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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
          this.router.navigateByUrl('/admin/app/(adr:modelos)')
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
