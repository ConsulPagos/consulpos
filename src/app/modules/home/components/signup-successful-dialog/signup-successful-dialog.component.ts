import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-signup-successful-dialog',
  templateUrl: './signup-successful-dialog.component.html',
  styleUrls: ['./signup-successful-dialog.component.scss']
})
export class SignupSuccessfulDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignupSuccessfulDialogComponent>) { }

  ngOnInit(): void {}

 
  onNoClick() {
    this.dialogRef.close();
  }
}