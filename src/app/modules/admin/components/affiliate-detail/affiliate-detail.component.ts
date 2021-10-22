import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AffiliateDetailJoinInterface, AffiliateDetailsInterface } from 'src/app/models/afiliado';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.component.html',
  styleUrls: ['./affiliate-detail.component.scss']
})
export class AffiliateDetailComponent implements OnInit {

  @Input() affiliate: AffiliateDetailJoinInterface;
  @Output() reload = new EventEmitter<boolean>();
  loading = false;

  constructor(private admin: AdminService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  approved() {
    this.loading = true;
    this.admin.mail_approved(this.affiliate).subscribe(res => {
      console.log(res)
      this.reload.emit(true)
      this._snackBar.open('Completado con éxito', 'X', {
        duration: 1500, 
        horizontalPosition: 'right',
        panelClass: ['ok-snackbar']
      })
    }, e => {
      this.loading = false;
      this._snackBar.open('Ha ocurrido un error inesperado', 'X', {
        duration: 1500, 
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      })
    })
  }

  verificate() {
    this.loading = true;
    this.admin.mail_verificate(this.affiliate).subscribe(res => {
      console.log(res)
      this.reload.emit(true)
      this._snackBar.open('Completado con éxito', 'X', {
        duration: 1500,
        horizontalPosition: 'right',
        panelClass: ['ok-snackbar']
      })
    }, e => {
      this.loading = false;
      this._snackBar.open('Ha ocurrido un error inesperado', 'X', {
        duration: 1500, horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      })
    })
  }


  openDialog(type): void {
    switch (type) {
      case 1:
        var body = 'Se aprobará el acceso del afiliado #' + this.affiliate.id;
        break;
      case 2:
        var body = 'Se verificará la cuenta del afiliado #' + this.affiliate.id;
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height:'auto',
      panelClass:'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (type) {
          case 1:
            console.log('aproved')
            this.approved();
            break;

          case 2:
            this.verificate();
            break;
        }
      }
    });
  }
}
