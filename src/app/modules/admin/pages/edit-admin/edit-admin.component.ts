import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoInterface } from 'src/app/models/estado';
import { RolInterface } from 'src/app/models/rol';
import { SucursalInterface } from 'src/app/models/sucrusal';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})

export class EditAdminComponent implements OnInit {

  loading = false;
  error = false;

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
  });

  clear() {
    this.form.reset();
  }

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

  estados: EstadoInterface[];

  roles: RolInterface[];

  sucursales: SucursalInterface[];

  constructor(private admin: AdminService, private router: Router, private toaster: ToasterService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Editar Usuario')
  }

}
