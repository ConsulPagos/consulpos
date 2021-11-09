import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { SucursalInterface } from '../../../../models/sucrusal';
import { EstadoInterface } from '../../../../models/estado';
import { RolInterface } from '../../../../models/rol';
// import { UserFormInterface } from '../../../../models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styleUrls: ['./nuevo-admin.component.scss']
})
export class NuevoAdminComponent implements OnInit {

  // user: UserFormInterface = {
  //   id_usuario:null,
  //   email :'',
  //   primer_nombre :'',
  //   segundo_nombre :'',
  //   primer_apellido :'',
  //   segundo_apellido :'',
  //   cedula :'',
  //   id_rol :null,
  //   telefono :'',
  //   direccion :'',
  //   id_estado:null,
  //   id_sucursal :null,
  // }
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo';
    }

    return this.email.hasError('email') ? 'Ingrese un correo valido' : '';
  }

    // usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    // nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    // password: /^.{4,12}$/, // 4 a 12 digitos.
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // telefono: /^\d{7,14}$/ // 7 a 14 numeros.

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    primer_nombre: new FormControl('', [Validators.required, Validators.min(90), Validators.max(99)]),
    segundo_nombre: new FormControl('', [Validators.required]),
    primer_apellido: new FormControl('', [Validators.required]),
    segundo_apellido: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    sucursal: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;
  error = false;

  constructor(private admin: AdminService, private router: Router, private toaster: ToasterService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Crear Usuario')
  }

  clear() {
    this.form.reset();
  }

  estados: EstadoInterface[] = [{
    id_estado: 1,
    estado: 'Merida'
  },
  {
    id_estado: 2,
    estado: 'Miranda'
  }]

  roles: RolInterface[] = [{
    id_rol: 1,
    rol: 'ADMIN',
    descripcion: 'Administrador Acceso SUPER',
  },
  {
    id_rol: 2,
    rol: 'VENDEDOR',
    descripcion: 'Vendedor de OCC',
  }]

  sucursales: SucursalInterface[] = [{
    id_occ: 1,
    nombre: 'Caracas CCCT',
    codigo_postal: 1080,
    direccion: 'Av. NewYork',
    localidad: 'no se',
    punto_referencia: 'por USA',
    email: 'metaverso@gmail.com',
    id_parroquia: 1,
    id_ciudad: 1,
  },
  {
    id_occ: 2,
    nombre: 'Pricipal IBM',
    codigo_postal: 1080,
    direccion: 'Av. York',
    localidad: 'no se',
    punto_referencia: 'por USA',
    email: 'metaverso@gmail.com',
    id_parroquia: 1,
    id_ciudad: 1,
  }]

  submit() {
    this.loading = true;
    this.admin.new_admin_users(this.form.value).subscribe(res => {
      this.loading = false;
      this.router.navigateByUrl(`/admin/app/(adr:super-admin-panel)`)
    }, e => {

      this.error = true;
      this.loading = false;

      if (e.error['error']) {
        this.toaster.error(e.error['error'].msg);
      } else {
        this.toaster.default_error();
      }

    })
  }


}
