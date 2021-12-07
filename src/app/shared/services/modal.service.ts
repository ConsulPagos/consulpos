import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  confirm(msg:string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height:'auto',
      panelClass:'custom-dialog',
      data: { 'body': msg }
    });

    return dialogRef.afterClosed()
  }

}
