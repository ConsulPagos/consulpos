import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { constant } from 'src/app/shared/utils/constant';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolInterface } from '../../../../models/rol';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss']
})
export class EditRolComponent implements OnInit {

  editRol: any;
  defaultResponse: DefaultResponse;
  modulos: any;
  permisos: boolean = false;
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
  ) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editRol) {
      this.editRol = this.router.getCurrentNavigation().extras.state.editRol;
      this.editRol.permisos.map(p => {
        p.have_value = true;
        return p
      })
    } else {
      this.router.navigateByUrl("/admin/app/(adr:roles)");
    }
    this.rolname = new FormGroup({
      nameRol: new FormControl(this.editRol.rol_name, [Validators.required]),
      descripcion: new FormControl(this.editRol.rol_descripcion, [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Editar Rol')
    this.modulo()
  }

  rolname: FormGroup;

  save() {
    this.modal.confirm("¿Desea actualizar a este rol?").subscribe(result => {
      if (result) {
        // console.log("acciones")
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
    // console.log("verify")
    this.rol.doModulosRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      // console.log(this.crypto.decryptString(res))
      const json = JSON.parse(this.crypto.decryptString(res))
      this.modulos = JSON.parse(this.crypto.decryptJson(json.permisos))
      // console.log(json.permisos)
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      // console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)
      // console.log(this.modulos)
      this.modulos.forEach(m => {
        m.submodulos.map(s => {
          s.selection = new SelectionModel<any>(true, []);

          return s
        })
      })
    })
  }

  submit() {
    var permisos = this.editRol.permisos
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rol_id: this.crypto.encryptJson(this.editRol.rol_id),
      rol: this.crypto.encryptJson(this.rolname.get('nameRol').value),
      rol_descripcion: this.crypto.encryptJson(this.rolname.get('descripcion').value),
      permisos: this.crypto.encryptJson(JSON.stringify(
        permisos
      ))
    }))
    console.log("verify")
    this.rol.doEditRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.permisos = JSON.parse(this.crypto.decryptJson(json.permisos))
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS);
    })

    switch (this.defaultResponse.R) {
      case constant.R0:
        this.router.navigateByUrl('/admin/app/(adr:dashboard)')
        this.toaster.success(this.defaultResponse.M)
        break;
      case constant.R1:
        this.toaster.error(this.defaultResponse.M)
        break;
      default:
        this.toaster.default_error()
        break;
    }
  }

  // isAllSelected(sub) {
  //   const numSelected = sub.selection.selected.length;
  //   const numRows = sub.permisos.length;
  //   return numSelected === numRows;
  // }

  // masterToggle(sub) {
  //   if (this.isAllSelected(sub)) {
  //     sub.selection.clear();
  //     return;
  //   }
  //   sub.selection.select(...sub.permisos);
  // }

  isActive(permiso_id, submodulo_id, modulo_id) {
    const resultado = this.editRol.permisos.filter(p => p.permiso_id == permiso_id && p.submodulo_id == submodulo_id && p.modulo_id == modulo_id)
    if (resultado.length > 0) {
      return resultado[0].have_value
    }
    return null
  }

  toggle(permiso_id, submodulo_id, modulo_id, submodulo) {
    submodulo.selection.toggle(permiso_id)
    console.log('Que es esotsswdwdo' + submodulo)
    var exits = this.isActive(permiso_id, submodulo_id, modulo_id);
    if (exits == null) {
      this.editRol.permisos.push({
        have_value: true,
        permiso_id: permiso_id,
        modulo_id: modulo_id,
        submodulo_id: submodulo_id,
      })
    } else {
      this.editRol.permisos.filter(p => p.permiso_id == permiso_id && p.submodulo_id == submodulo_id && p.modulo_id == modulo_id)[0].have_value = !exits;
    }
    console.log(this.editRol.permisos)
  }
}
