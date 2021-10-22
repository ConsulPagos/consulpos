import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DocumentValidationComponent } from '../components/document-validation/document-validation.component';

@Injectable({
  providedIn: 'root'
})
export class DocValidationService {

  constructor(private auth: AuthService, private dialog: MatDialog) { }

  verificate(show) {
    var access_level = this.auth.getAccessLevel();

    if (access_level == 1 || access_level == 2 || access_level == 3) {
      if (show) {
        this.showMsg(access_level);
      }
      return { 'valid': false, 'access_level': access_level }
    }
    return { 'valid': true, 'access_level': access_level }
  }
  showMsg(access_level) {

    var info = {};

    if (access_level == 1) {
      info = {
        'title': 'Documentos requeridos',
        'body': '  Antes de realizar pedidos, es necesario que ingreses los documentos de tu empresa. Dirijase a la verificación pulsando en el botón de abajo y complete los campos requeridos.',
        'verification': true
      }
    } else if (access_level == 2) {
      info = {
        'title': 'Documentos en revisión',
        'body': 'Estamos verificando tus documentos. Cuando tu cuenta sea verificada recibirás un correo de parte nuestra.',
        'verification': false
      }
    } else if (access_level == 3) {
      info = {
        'title': 'Solicitud en revisión',
        'body': 'Uno de nuestros agentes está revisando su solictud, pronto recibirá una respuesta a su correo.',
        'verification': true
      }
    }
    this.dialog.open(DocumentValidationComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: info
    });
  }
}
