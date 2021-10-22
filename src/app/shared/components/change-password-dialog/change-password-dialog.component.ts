import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator'
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  @Output() result = new EventEmitter<string>();


  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder,
    private auth: AuthService, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(5)]],
        new_password: ["", [Validators.required, Validators.minLength(5)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(5)]],
        email: [this.auth.getIdentity()]
      },
      {
        validator: ConfirmPasswordValidator("new_password", "confirmPassword")
      }
    );
  }

  onSubmit() {

    this.submitted = true;

    if (this.changePasswordForm.valid) {
      this.loading = true;
      this.auth.changePassword(this.changePasswordForm.value).subscribe(res => {
        this.loading = false;
        this.dialogRef.close();
        this.toaster.success('Contraseña cambiada con éxito');
      }, e => {
        this.loading = false;
        this.dialogRef.close();
        this.toaster.error(e.error.error['msg']);
      })
    }

  }

}
