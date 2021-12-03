import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ContribuyenteInterface } from '../../../../models/contribuyente';
import { EstadoInterface } from '../../../../models/estado';
import { CiudadInterface } from '../../../../models/ciudad';
import { ParroquiaInterface } from '../../../../models/parroquia';
import { MunicipioInterface } from '../../../../models/municipio';
import { ContactoInterface } from '../../../../models/contacto';
import { TipodocumentoInterface } from '../../../../models/tipo_documento';
import { TipoclienteInterface } from '../../../../models/tipo_cliente';
import { RepresentanteInterface } from 'src/app/models/user';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from 'src/app/models/validacioncliente_response';
import { AddClientDecrypter, AddClientResponse } from 'src/app/models/add_clients_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ActividadComercialInterface } from '../../../../models/actividad_comercial';
import { Router } from '@angular/router';
import { ClienteInterface } from '../../../../models/cliente';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  editClient:ClienteInterface={};

  //----------- VARIABLES GLOBALES -----------\\
  validacionresponse: ValidacionclienteResponse;
  addClientResponse: AddClientResponse;
  loading = false;
  agents = [];
  search_client: boolean = true;
  formats: RepresentanteInterface[] = [];
  contribuyentes: ContribuyenteInterface[];
  estados: EstadoInterface[];
  municipios: MunicipioInterface[];
  parroquias: ParroquiaInterface[];
  ciudades: CiudadInterface[];
  contactos: ContactoInterface[];
  actividades_comerciales: ActividadComercialInterface[];
  tipos_clientes: TipoclienteInterface[];
  tipo_documentos: TipodocumentoInterface[];


  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private router:Router
  ) { 

    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editClient){
      this.editClient = this.router.getCurrentNavigation().extras.state.editClient as ClienteInterface;
    }

    this.identity = new FormGroup({
      rif: new FormControl(this.editClient.rif.toString().substr(1), [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      tipo_doc: new FormControl(this.editClient.rif.toString().substr(0,1), [Validators.required]),
    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FORM DEL PRIMER STEP\\
  identity: FormGroup;

  //FORM DEL SEGUNDO STEP\\
  client_type = new FormGroup({
    tipo_cliente: new FormControl('', [Validators.required]),
  });

  ////////////////PHONE///////////////////
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];
  ////////////////////////////////////////

  //FORM DEL TERCER STEP\\
  client = new FormGroup({
    razon_social: new FormControl('', [Validators.required]),
    nombre_comercial: new FormControl('', [Validators.required]),
    contribuyente: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefono_local: new FormControl('', [Validators.required]),
    telefono_movil: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    parroquia: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    contacto: new FormControl('', [Validators.required]),
    codpostal: new FormControl('', [Validators.required]),
    act_comercial: new FormControl('', [Validators.required]),
    pto_referencia: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
  });

  //FORM DEL CUARTO STEP\\
  document = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  agent = new FormGroup({
    nombre_representante: new FormControl('', [Validators.required]),
    apellido_representante: new FormControl('', [Validators.required]),
    cedula_representante: new FormControl('', [Validators.required]),
    telefono_local_repre: new FormControl('', [Validators.required]),
    telefono_movil_repre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tipo_doc_rep: new FormControl('', [Validators.required]),
  });

  add_agent() {
    var newFormat: RepresentanteInterface = {};
    var agente = new FormGroup({
      nombre_representante: new FormControl(newFormat.nombre_representante, [Validators.required]),
      apellido_representante: new FormControl(newFormat.apellido_representante, [Validators.required]),
      cedula_representante: new FormControl(newFormat.cedula_representante, [Validators.required]),
      telefono_local_repre: new FormControl(newFormat.telefono_local_repre, [Validators.required]),
      telefono_movil_repre: new FormControl(newFormat.telefono_movil_repre, [Validators.required]),
      email: new FormControl(newFormat.email, [Validators.required]),
      tipo_doc_rep: new FormControl('', [Validators.required]),
    });
    this.agents.push(agente);
    this.formats.push(newFormat);
  }

  onlyNumberKey(event) {
    this.resetStatus()
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  getTipoCliente(): string {
    if (this.client_type.valid) {
      return this.tipos_clientes.filter(t => t.id == this.client_type.get('tipo_cliente').value)[0].t_c_letra
    } return null
  }

  deleteAgent(index: number) {
    this.formats.splice(index, 1);
  }

  verificar_usuario() {
    this.search_client = true;
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    // console.log(rif)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),
    }))
    const IMEI = '13256848646454643'
    this.loading = true;
    // console.log("verify")
    this.cliente.doVerificaicon(`${IMEI};${data}`).subscribe(res => {
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.search_client = this.validacionresponse.value_exists === "true" ? true : false;
      if (this.search_client) {
        this.identity.controls['rif'].setErrors({ 'existe': true });
      } else {
        this.identity.controls['rif'].setErrors({ 'existe': null });
        this.identity.controls['rif'].updateValueAndValidity()
      }
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }


  submit() {
    this.search_client = true;
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    console.log(rif)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      t_doc_id: this.crypto.encryptJson(this.identity.get('tipo_doc').value),
      rif: this.crypto.encryptJson(rif),

      t_cliente_id: this.crypto.encryptJson(this.client_type.get('tipo_cliente').value),
      status_id: this.crypto.encryptJson('1'),
      fecha_registro: this.crypto.encryptJson('12/02/2021'),

      razon_social: this.crypto.encryptJson(this.client.get('razon_social').value),
      comercio: this.crypto.encryptJson(this.client.get('nombre_comercial').value),
      contribuyente_id: this.crypto.encryptJson(this.client.get('contribuyente').value),
      email: this.crypto.encryptJson(this.client.get('email').value),
      telefono_local: this.crypto.encryptJson(this.client.get('telefono_local').value),
      telefono_movil: this.crypto.encryptJson(this.client.get('telefono_movil').value),
      estados: this.crypto.encryptJson(this.client.get('estado').value),
      municipios: this.crypto.encryptJson(this.client.get('municipio').value),
      parroquia_id: this.crypto.encryptJson(this.client.get('parroquia').value),
      ciudad_id: this.crypto.encryptJson(this.client.get('ciudad').value),
      cod_postal: this.crypto.encryptJson(this.client.get('codpostal').value),
      direccion: this.crypto.encryptJson(this.client.get('direccion').value),
      m_contacto_id: this.crypto.encryptJson(this.client.get('contacto').value),
      id_actividad_comercial: this.crypto.encryptJson(this.client.get('act_comercial').value),
      pto_ref: this.crypto.encryptJson(this.client.get('pto_referencia').value),
      localidad: this.crypto.encryptJson(this.client.get('localidad').value),
    }))

    const IMEI = '13256848646454643'
    this.loading = true;
    // console.log("verify")
    this.cliente.doSave(`${IMEI};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.addClientResponse = new AddClientDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.addClientResponse)

      // this.loading = false
      this.crypto.setKeys(this.addClientResponse.keyS, this.addClientResponse.ivJ, this.addClientResponse.keyJ, this.addClientResponse.ivS)
    })
  }

  ngOnInit(): void {

    
    this.title.setTitle('ConsulPos | Agregar Cliente')
    this.add_agent()
    this.estados = JSON.parse(this.storage.get(constant.ESTADOS)).estados
    this.contribuyentes = JSON.parse(this.storage.get(constant.CONTRIBUYENTES)).contribuyentes
    this.municipios = JSON.parse(this.storage.get(constant.MUNICIPIOS)).municipios
    this.parroquias = JSON.parse(this.storage.get(constant.PARROQUIAS)).parroquias
    this.ciudades = JSON.parse(this.storage.get(constant.CIUDADES)).ciudades
    this.contactos = JSON.parse(this.storage.get(constant.M_CONTACTO)).m_contactos
    this.tipos_clientes = JSON.parse(this.storage.get(constant.T_CLIENTES)).t_clientes
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.actividades_comerciales = JSON.parse(this.storage.get(constant.ACTIVIDAD_COMERCIAL)).actividades_comerciales
  }

  getError() {
    return this.identity.errors?.['existe']
  }

  resetStatus() {
    this.search_client = true;
  }

}
