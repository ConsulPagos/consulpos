import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.scss']
})
export class DocumentValidationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DocumentValidationComponent>,private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
  ok(){
    this.onNoClick();
    this.router.navigateByUrl("/afiliado/app/(afr:verifique-su-cuenta)")
  }
}
