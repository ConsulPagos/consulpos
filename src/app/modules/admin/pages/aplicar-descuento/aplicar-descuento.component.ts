import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-aplicar-descuento',
  templateUrl: './aplicar-descuento.component.html',
  styleUrls: ['./aplicar-descuento.component.scss']
})
export class AplicarDescuentoComponent implements OnInit {

  id;
  loading = false;
  error = false;

  form = new FormGroup({
    porcentaje: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    fecha_limite: new FormControl('', [Validators.required]),
  });

  constructor(private admin: AdminService, private routes: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
  }

  submit() {
    this.loading = true;
    this.admin.apply_discount(this.id, this.form.value).subscribe(res => {
      this.loading = false;
      this.router.navigateByUrl(`/admin/app/(adr:crm/${this.id})`);
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

}
