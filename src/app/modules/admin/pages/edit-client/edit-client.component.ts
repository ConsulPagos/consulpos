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
import { ClienteRequestInterface } from '../../../../models/cliente_request';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  editClient: ClienteRequestInterface = {};

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
    private router: Router,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
  ) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.editClient) {
      this.editClient = this.router.getCurrentNavigation().extras.state.editClient as ClienteRequestInterface;
      console.log(this.editClient)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:clientela)");
    }

    this.identity = new FormGroup({
      rif: new FormControl(this.editClient.rif.toString().substr(1), [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      tipo_doc: new FormControl(this.editClient.rif.toString().substr(0, 1), [Validators.required]),
    });

    this.client = new FormGroup({
      razon_social: new FormControl(this.editClient.razon_social, [Validators.required]),
      nombre_comercial: new FormControl(this.editClient.comercio, [Validators.required]),
      contribuyente: new FormControl(this.editClient.contribuyente_id, [Validators.required]),
      email: new FormControl(this.editClient.correo, [Validators.required]),
      // telefono_local: new FormControl(this.editClient.telefonos, [Validators.required]),
      // telefono_movil: new FormControl(this.editClient.telefonos, [Validators.required]),
      estado: new FormControl(this.editClient.id_estado, [Validators.required]),
      municipio: new FormControl(this.editClient.id_municipio, [Validators.required]),
      parroquia: new FormControl(this.editClient.parroquia_id, [Validators.required]),
      ciudad: new FormControl(this.editClient.ciudad_id, [Validators.required]),
      direccion: new FormControl(this.editClient.direccion, [Validators.required]),
      contacto: new FormControl(this.editClient.m_contacto_id, [Validators.required]),
      codpostal: new FormControl(this.editClient.cod_postal, [Validators.required]),
      act_comercial: new FormControl(this.editClient.id_actividad_comercial, [Validators.required]),
      pto_referencia: new FormControl(this.editClient.pto_ref, [Validators.required]),
      localidad: new FormControl(this.editClient.localidad, [Validators.required]),
    });

    this.client_type = new FormGroup({
      tipo_cliente: new FormControl(this.editClient.t_cliente_id, [Validators.required]),
    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FORM DEL PRIMER STEP\\
  identity: FormGroup;

  //FORM DEL SEGUNDO STEP\\
  client_type: FormGroup;

  ////////////////PHONE///////////////////
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];
  ////////////////////////////////////////

  //FORM DEL TERCER STEP\\
  client: FormGroup;

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

  submit() {
    this.search_client = true;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      t_doc_id: this.crypto.encryptJson(this.identity.get('tipo_doc').value),
      rif: this.crypto.encryptJson(this.editClient.rif),
      t_cliente_id: this.crypto.encryptJson(this.client_type.get('tipo_cliente').value),

      razon_social: this.crypto.encryptJson(this.client.get('razon_social').value),
      comercio: this.crypto.encryptJson(this.client.get('nombre_comercial').value),
      contribuyente_id: this.crypto.encryptJson(this.client.get('contribuyente').value),
      email: this.crypto.encryptJson(this.client.get('email').value),
      // telefono_local: this.crypto.encryptJson(this.client.get('telefono_local').value),
      // telefono_movil: this.crypto.encryptJson(this.client.get('telefono_movil').value),
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


    this.loading = true;
    console.log("verify")
    this.cliente.doEdit(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.addClientResponse = new AddClientDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.addClientResponse)
      this.loading = false
      this.crypto.setKeys(this.addClientResponse.keyS, this.addClientResponse.ivJ, this.addClientResponse.keyJ, this.addClientResponse.ivS)

      switch (this.addClientResponse.R) {
        case constant.R0:
          this.router.navigateByUrl('/admin/app/(adr:clientela)')
          this.toaster.success(this.addClientResponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.addClientResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Editar Cliente')
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

  save() {
    this.modal.confirm("¿Desea actualizar a este cliente?").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  /*   isInvalid(): boolean {
      if
      return this.client.invalid;
    } */
}
