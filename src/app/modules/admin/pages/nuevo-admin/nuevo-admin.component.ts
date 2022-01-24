import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { SucursalInterface } from '../../../../models/sucrusal';
import { EstadoInterface } from '../../../../models/estado';
import { RolInterface } from '../../../../models/rol';
import { Title } from '@angular/platform-browser';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { ComisionableInterface } from 'src/app/models/comisionable';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styleUrls: ['./nuevo-admin.component.scss']
})
export class NuevoAdminComponent implements OnInit {

  hide = true;
  loading = false;
  error = false;
  validacionres: DefaultResponse;
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

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    primer_nombre: new FormControl('', [Validators.required, Validators.min(90), Validators.max(99)]),
    segundo_nombre: new FormControl('', [Validators.required]),
    primer_apellido: new FormControl('', [Validators.required]),
    segundo_apellido: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    pto_referencia: new FormControl('', [Validators.required]),
    occ: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    codpostal: new FormControl('', [Validators.required]),
    tipo_doc_user: new FormControl('', [Validators.required]),
    phone_user: new FormControl('', [Validators.required]),
    comisionable: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private toaster: ToasterService,
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private usuario: UsuariosService,
  ) 
  {

  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Crear Usuario')
    this.estados = JSON.parse(this.storage.get(constant.ESTADOS)).estados
    this.sucursales = JSON.parse(this.storage.get(constant.OCCS)).occs
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.roles = JSON.parse(this.storage.get(constant.ROLES)).roles
  }

  clear() {
    this.adminForm.reset();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  save() {
    this.modal.confirm("Se prodecera a registrar un nuevo usuario").subscribe(result => {
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
      primer_nombre: this.crypto.encryptJson(this.adminForm.get('primer_nombre').value),
      segundo_nombre: this.crypto.encryptJson(this.adminForm.get('segundo_nombre').value),
      primer_apellido: this.crypto.encryptJson(this.adminForm.get('primer_apellido').value),
      segundo_apellido: this.crypto.encryptJson(this.adminForm.get('segundo_apellido').value),
      t_doc_id: this.crypto.encryptJson(this.adminForm.get('tipo_doc_user').value),
      cedula: this.crypto.encryptJson(this.adminForm.get('cedula').value),
      rol_id: this.crypto.encryptJson(this.adminForm.get('rol').value),
      email: this.crypto.encryptJson(this.adminForm.get('email').value),
      telefono: this.crypto.encryptJson(JSON.stringify(
        {
          number: this.adminForm.get("phone_user").value.number,
          cod_area: this.adminForm.get("phone_user").value.dialCode,
          iso: this.adminForm.get("phone_user").value.countryCode
        }
      )),
      direccion: this.crypto.encryptJson(this.adminForm.get('direccion').value),
      pto_ref: this.crypto.encryptJson(this.adminForm.get('pto_referencia').value),
      cod_postal: this.crypto.encryptJson(this.adminForm.get('codpostal').value),
      occ_id: this.crypto.encryptJson(this.adminForm.get('occ').value),
      psw: this.crypto.encryptJson(this.crypto.hash(this.adminForm.get('password').value)),
      comisionable: this.crypto.encryptJson(this.adminForm.get('comisionable').value),
      localidad: this.crypto.encryptJson(this.adminForm.get('localidad').value),
      apps: this.crypto.encryptJson(JSON.stringify([
        {
          app_id: "1",
        }
      ])),
    }))

    this.loading = true;
    console.log("verify")
    this.usuario.doSaveUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionres = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionres)
      this.loading = false
      this.crypto.setKeys(this.validacionres.keyS, this.validacionres.ivJ, this.validacionres.keyJ, this.validacionres.ivS)
      switch (this.validacionres.R) {
        case constant.R0:
          this.toaster.success(this.validacionres.M)
          this.router.navigateByUrl('/admin/app/(adr:super-admin-panel)')
          break;
        case constant.R1:
          this.toaster.error(this.validacionres.M)
          break;
      }
    })
  }


}
