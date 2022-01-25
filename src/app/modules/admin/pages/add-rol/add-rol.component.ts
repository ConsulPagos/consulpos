import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss']
})
export class AddRolComponent implements OnInit {

  defaultResponse: DefaultResponse;
  modulos: any;
  permisos: any;
  displayedColumns: string[] = ['select', 'permiso'];

  constructor(
    private title: Title,
    private modal: ModalService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private rol: RolesService,

  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar rol')
    this.modulo()

  }

  rolname = new FormGroup({
    nameRol: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  clear() {
    this.rolname.reset();
  }

  save() {
    this.modal.confirm("Se agregara una nueva tasa y se desactivará la anterior").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  modulo() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      app_id: this.crypto.encryptJson('1'),
    }))
    console.log("verify")
    this.rol.doModulosRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      const json = JSON.parse(this.crypto.decryptString(res))
      this.modulos = JSON.parse(this.crypto.decryptJson(json.permisos))
      console.log(json.permisos)
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)
      console.log(this.modulos)
      this.modulos.forEach(m => {
        m.submodulos.map(s => {
          s.selection = new SelectionModel<any>(true, []);
          return s
        })
      })
    })
  }

  submit() {
    var permisos = this.getPermisosSelected()
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rol: this.crypto.encryptJson(this.rolname.get('nameRol').value),
      descricion: this.crypto.encryptJson(this.rolname.get('descripcion').value),
      permisos: this.crypto.encryptJson(JSON.stringify(
        permisos
      ))
    }))
    console.log("verify")
    this.rol.doSaveRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.permisos = JSON.parse(this.crypto.decryptJson(json.permisos))
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS);
    })
  }

  getPermisosSelected() {
    var permisos = []
    this.modulos.forEach(m => {
      m.submodulos.forEach(s => {
        s.selection.selected.forEach(p => {
          permisos.push(p.permiso_submodulo_id)
        })
      })
    })
    return permisos
  }

  isAllSelected(sub) {
    const numSelected = sub.selection.selected.length;
    const numRows = sub.permisos.length;
    return numSelected === numRows;
  }

  masterToggle(sub) {
    if (this.isAllSelected(sub)) {
      sub.selection.clear();
      return;
    }
    sub.selection.select(...sub.permisos);
  }

}
