import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-aplicar-credito',
  templateUrl: './aplicar-credito.component.html',
  styleUrls: ['./aplicar-credito.component.scss']
})
export class AplicarCreditoComponent implements OnInit {

  id;
  loading = false;
  error = false;

  form = new FormGroup({
    credito: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(private admin: AdminService, private routes: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
  }

  submit() {
    this.loading = true;
    this.admin.apply_credit(this.id, this.form.value).subscribe(res => {
      this.loading = false;
      this.router.navigateByUrl(`/admin/app/(adr:crm/${this.id})`)
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

}
