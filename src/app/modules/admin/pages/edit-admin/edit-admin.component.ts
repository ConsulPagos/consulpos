import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoInterface } from 'src/app/models/estado';
import { RolInterface } from 'src/app/models/rol';
import { SucursalInterface } from 'src/app/models/sucrusal';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Title } from '@angular/platform-browser';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { ComisionableInterface } from 'src/app/models/comisionable';
import { UserRequestInterface } from '../../../../models/user_request';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { constant } from 'src/app/shared/utils/constant';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { SesionService } from 'src/app/shared/services/sesion.service';


@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})

export class EditAdminComponent implements OnInit {

  showUser: UserRequestInterface = {};

  hide = true;
  loading = false;
  error = false;
  default: DefaultResponse;
  estados: EstadoInterface[];
  roles: RolInterface[];
  sucursales: SucursalInterface[];
  tipo_documentos: TipodocumentoInterface[];
  comisionables: ComisionableInterface[] = [
    {
      id: 0,
      nombre: 'No',
    },
    {
      id: 1,
      nombre: 'Si',
    }
  ]


  constructor(
    private router: Router,
    private toaster: ToasterService,
    private title: Title,
    private storage: StorageService,
    private modal: ModalService,
    private crypto: CryptoService,
    private usuario: UsuariosService,
    private session: SesionService,
  ) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.showUser) {
      this.showUser = this.router.getCurrentNavigation().extras.state.showUser as UserRequestInterface;
    } 
    else {
      this.router.navigateByUrl("/admin/app/(adr:super-admin-panel)");
    }

    this.adminForm = new FormGroup({
      primer_nombre: new FormControl(this.showUser.p_nombre, [Validators.required, Validators.min(90), Validators.max(99)]),
      segundo_nombre: new FormControl(this.showUser.s_nombre, [Validators.required]),
      primer_apellido: new FormControl(this.showUser.p_apellido, [Validators.required]),
      segundo_apellido: new FormControl(this.showUser.s_apellido, [Validators.required]),
      email: new FormControl(this.showUser.email, [Validators.required, Validators.email]),
      rol_id: new FormControl(this.showUser.rol.rol_id, [Validators.required]),
      direccion: new FormControl(this.showUser.direccion, [Validators.required]),
      localidad: new FormControl(this.showUser.localidad, [Validators.required]),
      pto_referencia: new FormControl(this.showUser.pto_ref, [Validators.required]),
      occ_id: new FormControl(this.showUser.occ_id, [Validators.required]),
      codpostal: new FormControl(this.showUser.cod_postal, [Validators.required]),
      comisionable: new FormControl(this.showUser.comisionable, [Validators.required]),
    });

  }

  adminForm: FormGroup;

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  submit() {

    var data: any = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      cedula: this.crypto.encryptJson(this.showUser.cedula),

      primer_nombre: this.crypto.encryptJson(this.adminForm.get('primer_nombre').value),
      segundo_nombre: this.crypto.encryptJson(this.adminForm.get('segundo_nombre').value),
      primer_apellido: this.crypto.encryptJson(this.adminForm.get('primer_apellido').value),
      segundo_apellido: this.crypto.encryptJson(this.adminForm.get('segundo_apellido').value),
      email: this.crypto.encryptJson(this.adminForm.get('email').value),

      direccion: this.crypto.encryptJson(this.adminForm.get('direccion').value),
      pto_ref: this.crypto.encryptJson(this.adminForm.get('pto_referencia').value),
      localidad: this.crypto.encryptJson(this.adminForm.get('localidad').value),
      cod_postal: this.crypto.encryptJson(this.adminForm.get('codpostal').value),
      occ_id: this.crypto.encryptJson(this.adminForm.get('occ_id').value),
      comisionable: this.crypto.encryptJson(this.adminForm.get('comisionable').value),
      rol_id: this.crypto.encryptJson(this.adminForm.get('rol_id').value),
      app_id: this.crypto.encryptJson('1'),

      tlf: this.crypto.encryptJson('04242735855')
    }
    
    const dataS = this.crypto.encryptString(JSON.stringify(data));

    this.loading = true;
    console.log("verify")
    this.usuario.doEditUser(`${this.session.getDeviceId()};${dataS}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
      this.loading = false
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)

      switch (this.default.R) {
        case constant.R0:
          this.router.navigateByUrl('/admin/app/(adr:dashboard)')
          this.toaster.success(this.default.M)
          break;
        case constant.R1:
          this.toaster.error(this.default.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Editar Usuario')
    this.estados = JSON.parse(this.storage.get(constant.ESTADOS)).estados
    this.sucursales = JSON.parse(this.storage.get(constant.OCCS)).occs
    this.roles = JSON.parse(this.storage.get(constant.ROLES)).roles
  }

  save() {
    this.modal.confirm("¿Desea actualizar a este Usuario?").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

}
