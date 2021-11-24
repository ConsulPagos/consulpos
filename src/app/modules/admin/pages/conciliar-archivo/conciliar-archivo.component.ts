import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmTableInterface } from 'src/app/models/crm';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';
import { BancoInterface } from '../../../../models/banco'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-conciliar-archivo',
  templateUrl: './conciliar-archivo.component.html',
  styleUrls: ['./conciliar-archivo.component.scss']
})
export class ConciliarArchivoComponent implements OnInit {

  data: any = { 'affiliate': {} };
  affiliate: CrmTableInterface;
  loading = false;
  error = false;
  id;

  constructor(private admin: AdminService, private routes: ActivatedRoute, private router: Router, private title: Title, private storage:StorageService) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Conciliar Archivo')
  }

  ca = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    proceso: new FormControl('', [Validators.required]),
  });

  bancos: BancoInterface[];

  procesos = [{
    id: 1,
    fecha: '10/11/2021 2:54 pm',
    trace: '11558'
  }]

  load() {

    this.loading = true;
    this.error = false;

    this.router.navigateByUrl('/admin/app/(adr:previsualizar-archivo)');

  }

  isValid(limite_descuento) {
    if (limite_descuento) {
      var ld = new Date(limite_descuento)
      var now = new Date()
      return ld.getTime() > now.getTime() ? true : false;
    } else {
      return false;
    }
  }
}
