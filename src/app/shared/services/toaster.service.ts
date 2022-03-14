import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private _snackBar: MatSnackBar) { }

  success(msg) {
    this._snackBar.open(msg, null, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition:'bottom',
      panelClass: ['ok-snackbar'],
    })
  }

  error(msg) {
    this._snackBar.open(msg, null, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition:'bottom',
      panelClass: ['error-snackbar']
    })
  }

  progress(msg) {
    this._snackBar.open(msg, null, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition:'bottom',
      panelClass: ['progress-snackbar']
    })
  }

  default_error() {
   this.error('Ha ocurrido un error inesperado, intentelo nuevamente.')
  }

}
