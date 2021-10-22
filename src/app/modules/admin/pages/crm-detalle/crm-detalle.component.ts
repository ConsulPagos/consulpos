import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrmTableInterface } from 'src/app/models/crm';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-crm-detalle',
  templateUrl: './crm-detalle.component.html',
  styleUrls: ['./crm-detalle.component.scss']
})
export class CrmDetalleComponent implements OnInit {

  data: any = { 'affiliate': {} };
  affiliate: CrmTableInterface;
  loading = false;
  error = false;
  id;

  constructor(private admin: AdminService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    //this.id = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    //this.load()
  }

  load() {

    this.loading = true;
    this.error = false;

    this.admin.get_crm_affiliate(this.id).subscribe(data => {

      this.data = data;
      this.loading = false;

    }, e => {

      this.loading = false;
      this.error = true;

    })
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
