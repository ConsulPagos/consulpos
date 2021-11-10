import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmTableInterface } from 'src/app/models/crm';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';
import { BancoInterface } from '../../../../models/banco'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private admin: AdminService, private routes: ActivatedRoute, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Conciliar Archivo')
  }

  ca = new FormGroup({
    banco: new FormControl('', [Validators.required]),
  });

  bancos: BancoInterface[] = [{
    id_banco: 1,
    banco: 'BANCO DE VENEZUELA',
    codigo: '0102',
    id_plataforma: 1,
  },
  {
    id_banco: 2,
    banco: 'BANCO NACIONAL DE CREDITO',
    codigo: '0191',
    id_plataforma: 2,
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
