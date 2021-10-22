import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AffiliateDetailsInterface, AfiliadoInterface } from 'src/app/models/afiliado';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  identity = '';
  toggleNavbar = true;
  affiliate: AffiliateDetailsInterface = {};
  error = false;
  loading = false;
  errorDetails;
  access_level;
  loadingCedulaRepresentante = false;
  loadingRifEmpresa = false;
  loadingRegistroMercantil = false;
  loadingException = false;


  constructor(private api: ApiService, public dialog: MatDialog, private auth: AuthService, private route: Router, private storage: StorageService, private toaster: ToasterService) {
    this.identity = this.auth.getIdentity();
    this.access_level = this.auth.getAccessLevel();
  }

  ngOnInit(): void {
    this.load();
    this.storage.changes.subscribe(data => {
      if (data.key == 'access_level') {
        this.access_level = data.value;
      }
    });
  }

  loggout() {
    this.auth.loggout();
  }

  hideMenu() {
    if (!this.toggleNavbar) {
      this.toggleNavbar = true;
    }
  }

  load() {
    var id = parseInt(this.auth.getUserId());
    this.error = false;
    this.loading = true;
    this.api.affiliate_details(id).subscribe(data => {
      this.affiliate = data;
    }, e => {
      this.loading = false;
      this.error = true;
      this.errorDetails = e;
    });
  }

  onUpload(url, type) {

    this.affiliate.id_afiliado = parseInt(this.auth.getUserId());

    if (type == 'cedula_representante') {
      this.loadingCedulaRepresentante = true;
      this.affiliate.cedula_representante = url;
    } else if (type == 'rif_empresa') {
      this.affiliate.rif_empresa = url;
      this.loadingRifEmpresa = true;
    } else if (type == 'registro_mercantil') {
      this.affiliate.registro_mercantil = url;
      this.loadingRegistroMercantil = true;
    }

    this.api.update_affiliate_details(this.affiliate).subscribe(af => {
      var afiliado = af as AfiliadoInterface;

      this.loadingRifEmpresa = false;
      this.loadingCedulaRepresentante = false;
      this.loadingRegistroMercantil = false;

      if (this.auth.getAccessLevel() != afiliado.access_level) {

        this.toaster.success('Documento guardado con éxito, la verificación de su cuenta se encuentra en proceso')
        this.route.navigateByUrl('/afiliado/app/(afr:portafolio)')

        this.storage.store('access_level', afiliado.access_level)
      } else {
        this.toaster.success('Documento guardado con éxito')
      }

    }, e => {
      this.toaster.error('Error al guardar el documento, intentelo nuevamente')
      this.loadingRifEmpresa = false;
      this.loadingCedulaRepresentante = false;
      this.loadingRegistroMercantil = false;
    });
  }

  omitir() {
    this.route.navigateByUrl('/afiliado/app/(afr:portafolio)')
  }


  openDialog(): void {

    var body = 'Solicitará que se considere un execpción por falta de documentos';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '350px',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.request_execption();
      }
    });
  }

  request_execption() {
    this.loadingException = true;
    this.api.requets_exception(this.auth.getUserId()).subscribe(data => {
      this.loadingException = false;
      this.storage.store('access_level', data['access_level']);
      this.toaster.success('Su solicitud está siendo revisada, pronto recibirá una respuesta a su correo electónico');
    }, e => {
      this.loadingException = false;
      this.toaster.error('Ha ocurrido un error inesperado, intentelo de nuevo, si el error persiste pongase en contacto con nosotros');
    });
  }

}
