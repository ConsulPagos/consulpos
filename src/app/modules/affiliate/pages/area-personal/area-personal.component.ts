import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressInterface } from 'src/app/models/address';
import { AffiliateDetailsInterface, AfiliadoInterface } from 'src/app/models/afiliado';
import { ChangePasswordDialogComponent } from 'src/app/shared/components/change-password-dialog/change-password-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { EditAddressDialogComponent } from '../../components/edit-address-dialog/edit-address-dialog.component';


@Component({
  selector: 'app-area-personal',
  templateUrl: './area-personal.component.html',
  styleUrls: ['./area-personal.component.scss']
})
export class AreaPersonalComponent implements OnInit {

  affiliate: AffiliateDetailsInterface;
  error = false;
  loading = false;
  errorDetails;
  access_level;
  loadingCedulaRepresentante = false;
  loadingRifEmpresa = false;
  loadingRegistroMercantil = false;
  direcciones: AddressInterface[] = []

  constructor(private api: ApiService, private dialog: MatDialog, private auth: AuthService, private route: Router, private storage: StorageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.load();
    this.access_level = this.auth.getAccessLevel();
    this.storage.changes.subscribe(data => {
      if (data.key == 'access_level') {
        this.access_level = data.value;
      } else if (data.key == 'addresses') {
        this.direcciones = data.value;
      }
    })
  }

  load() {
    var id = parseInt(this.auth.getUserId());
    this.direcciones = <AddressInterface[]>JSON.parse(localStorage.getItem('addresses'));
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
        this.msgOk('Documento guardado con éxito, la verificación de su cuenta se encuentra en proceso')
        this.storage.store('access_level', afiliado.access_level)
      } else {
        this.msgOk('Documento guardado con éxito')
      }

    }, e => {
      this.msgError('Error al guardar el documento, intentelo nuevamente')
      this.loadingRifEmpresa = false;
      this.loadingCedulaRepresentante = false;
      this.loadingRegistroMercantil = false;
    });
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  getFileName(type) {
    return this.affiliate.id + '_' + type;
  }

  msgOk(msg) {
    this._snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: ['ok-snackbar']
    })
  }

  msgError(msg) {
    this._snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    })
  }

  changePassword() {
    var dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {},
      panelClass: 'custom-dialog'
    });
  }

  editAddress() {
    var dialogRef = this.dialog.open(EditAddressDialogComponent, {
      width: '600px',
      height: 'auto',
      data: {},
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}