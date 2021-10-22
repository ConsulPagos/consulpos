import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AffiliateDetailsInterface, AfiliadoInterface } from 'src/app/models/afiliado';
import { EditFieldDialogComponent } from 'src/app/shared/components/edit-field-dialog/edit-field-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-affiliate',
  templateUrl: './edit-affiliate.component.html',
  styleUrls: ['./edit-affiliate.component.scss']
})
export class EditAffiliateComponent implements OnInit {

  @Input() add: boolean;
  @Input() field: string;
  @Input() affiliate: AffiliateDetailsInterface;
  loading = false;

  constructor(private dialog: MatDialog, private api: ApiService, private _toaster: ToasterService) { }

  ngOnInit(): void {
  }

  showDialog() {

    var myfield = this.field;
    var value = '';

    if (this.field == 'telefono') {
      myfield = 'Teléfono';
      value = this.affiliate.telefono;
    } else if (this.field == 'direccion_despacho') {
      myfield = 'Dirección de despacho';
      value = this.affiliate.direccion_despacho;
    } else if (this.field == 'telefono_auxiliar') {
      myfield = 'Teléfono auxiliar';
      value = this.affiliate.telefono_auxiliar;
    }

    var dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '400px',
      height: 'auto',
      data: { 'field': myfield, 'value': value },
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      result = (result as string).trim();

      if (result.length > 0) {
        this.loading = true;
        if (this.field == 'telefono') {
          this.affiliate.telefono = result;
        } else if (this.field == 'direccion_despacho') {
          this.affiliate.direccion_despacho = result;
        } else if (this.field == 'telefono_auxiliar') {
          this.affiliate.telefono_auxiliar = result;
        }

        this.api.update_affiliate_details(this.affiliate).subscribe(af => {
          this.loading = false;
          this._toaster.success('Guardado con éxito')
        }, e => {
          this.loading = false;
          this._toaster.error('Ha ocurrido un error, intentelo nuevamente')
        });
      }
    });
  }

}
