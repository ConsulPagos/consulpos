import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-admin-change-pwd',
  templateUrl: './admin-change-pwd.component.html',
  styleUrls: ['./admin-change-pwd.component.scss']
})
export class AdminChangePwdComponent implements OnInit {

  form = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(5)]],
    new_password: ["", [Validators.required, Validators.minLength(5)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(5)]],
    email: [this.auth.getIdentity()]
  },
    {
      validator: ConfirmPasswordValidator("new_password", "confirmPassword")
    });

  loading = false;
  error = false;

  constructor(private auth: AuthService, private fb: FormBuilder, private router:Router, private toaster:ToasterService) { }
  ngOnInit(): void {
  }

  submit() {
    
  }

}
