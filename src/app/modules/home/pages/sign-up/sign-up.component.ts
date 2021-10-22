import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorResponse } from 'src/app/models/auth_response';
import { ApiService } from 'src/app/shared/services/api.service';
import { AffiliateDetailsInterface, AfiliadoInterface } from '../../../../models/afiliado';
import { SignupSuccessfulDialogComponent } from '../../components/signup-successful-dialog/signup-successful-dialog.component';
import { AddressInterface } from '../../../../models/address';
import { ZoneInterface } from '../../../../models/zone';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({
    presencia_online: new FormControl('', [Validators.required, Validators.minLength(1)]),
    representante: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nombre_empresa: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.min(1)]),
    telefono_auxiliar: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  despachoForm = new FormGroup({
    calle: new FormControl('', [Validators.required]),
    edificio: new FormControl('', [Validators.required]),
    sector: new FormControl('', [Validators.required]),
    zona: new FormControl('', [Validators.required]),
    referencia: new FormControl('', [Validators.required]),
    state: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  details: AffiliateDetailsInterface = {};
  affiliate: AfiliadoInterface = {}
  address: AddressInterface = {}

  loading: Boolean = false;
  submitted: Boolean = false;
  nextClicked: Boolean = false;
  error: ErrorResponse = {};
  zones: ZoneInterface[] = [];
  loadingZones = false;
  errorZones = false;
  selectedZone:ZoneInterface = {};

  constructor(private api: ApiService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(){
    this.errorZones = false;
    this.loadingZones = true;
    this.api.get_zones().subscribe(data => {
      console.log(data)
      this.zones = data['zones'];
      this.loadingZones = false;
    }, e => {
      this.errorZones = true;
    })
  }

  onSubmit() {

    this.error = {};
    this.submitted = true;

    if (this.despachoForm.valid) {

      this.loading = true;

      //detalles del afiliado
      this.details = {};
      this.details.presencia_online = this.registerForm.get('presencia_online').value;
      this.details.representante = this.registerForm.get('representante').value;
      this.details.nombre_empresa = this.registerForm.get('nombre_empresa').value;
      this.details.created_at = null;
      this.details.id = null;
      this.details.id_afiliado = null;
      this.details.updated_at = null;
      this.details.registro_mercantil = null;
      this.details.rif_empresa = null;
      this.details.cedula_representante = null;
      this.details.telefono = this.registerForm.get('telefono').value;
      this.details.telefono_auxiliar = this.registerForm.get('telefono_auxiliar').value;

      this.address.calle = this.despachoForm.get('calle').value
      this.address.edificio = this.despachoForm.get('edificio').value
      this.address.sector = this.despachoForm.get('sector').value
      this.address.id_zona = this.selectedZone.id
      this.address.referencia = this.despachoForm.get('referencia').value
      this.address.zona = this.selectedZone.nombre

      //Datos del afiliado
      this.affiliate.id = null;
      this.affiliate.email = this.registerForm.get('email').value;
      this.affiliate.access_level = 0;
      this.affiliate.created_at = null;
      this.affiliate.updated_at = null;
      this.affiliate.id_estado = this.despachoForm.get('state').value

      var body = { 'affiliate': this.affiliate, 'details': this.details, 'address': this.address }
      this.api.new_affiliate_details(body).subscribe(res => {
        this.openDialog();
        this.registerForm.reset();
        this.despachoForm.reset();
        this.loading = false;
      }, e => {
        this.loading = false;
        this.error = e.error['error'];
      })
    }
  }

  openDialog(): void {
    this.dialog.open(SignupSuccessfulDialogComponent, {
      width: '450px',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  setZone(index){
    if(index){
      this.selectedZone = this.zones[index]
    }
  }

}
