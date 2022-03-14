import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoriaInterface } from 'src/app/models/categoria';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { MarcaInterface } from 'src/app/models/marca';
import { ValidacionCategoriasDecrypter, ValidacionCategoriasResponse } from 'src/app/models/validacioncategoria_response';
import { ValidacionMarcaResponse, ValidacionMarcaDecrypter } from 'src/app/models/validacionmarca_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-edit-modelos',
  templateUrl: './edit-modelos.component.html',
  styleUrls: ['./edit-modelos.component.scss']
})
export class EditModelosComponent implements OnInit {

  loading = false;
  defaultResponse: DefaultResponse;
  marcaResponse: ValidacionMarcaResponse;
  marcas: MarcaInterface[];

  categoriaResponse: ValidacionCategoriasResponse;
  categorias: CategoriaInterface[];
  editmodelos: any = {};
  
  complementos=[
    {
      name:'Si',
      id:'1'
    },
    {
      name:'No',
      id:'0'
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
  ) { 
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editmodelos) {
      this.editmodelos = this.router.getCurrentNavigation().extras.state.editmodelos as any;
    } else {
      this.router.navigateByUrl("/admin/app/(adr:modelos)");
    }

    this.form = new FormGroup({
      modelo: new FormControl(this.editmodelos.modelo, [Validators.required]),
      price: new FormControl(this.editmodelos.precio, [Validators.required]),
      marca: new FormControl(this.editmodelos.id_marca, [Validators.required]),
      categoria: new FormControl(this.editmodelos.categoria_id, [Validators.required]),
      vendible: new FormControl(this.editmodelos.vendible, [Validators.required]),
      complemento: new FormControl(this.editmodelos.complemento, [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.marca()
    this.categoria()
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
    this.inventario.doEditModels(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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
