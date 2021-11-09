import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmTableInterface } from 'src/app/models/crm';
import { AdminService } from '../../services/admin.service';

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

  constructor(private admin: AdminService, private routes: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //this.id = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
  }

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
