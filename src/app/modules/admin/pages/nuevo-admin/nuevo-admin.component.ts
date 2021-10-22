import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styleUrls: ['./nuevo-admin.component.scss']
})
export class NuevoAdminComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    access_level: new FormControl('', [Validators.required, Validators.min(90), Validators.max(99)]),
  });

  loading = false;
  error = false;

  constructor(private admin: AdminService, private router: Router, private toaster: ToasterService) { }

  ngOnInit(): void {
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


}
