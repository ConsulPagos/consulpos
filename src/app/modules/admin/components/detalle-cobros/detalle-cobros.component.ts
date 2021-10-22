import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CrmTableInterface } from 'src/app/models/crm';

@Component({
  selector: 'app-detalle-cobros',
  templateUrl: './detalle-cobros.component.html',
  styleUrls: ['./detalle-cobros.component.scss']
})
export class DetalleCobrosComponent implements OnInit {

  data: any = { 'affiliate': {} };
  affiliate: CrmTableInterface;
  loading = false;
  error = false;
  id;

  constructor(private admin: AdminService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    this.load()
  }

  load() {

    this.loading = true;
    this.error = false;

    this.admin.get_affilite_payment_status(this.id).subscribe(data => {

      this.data = data;
      this.loading = false;

    }, () => {

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
