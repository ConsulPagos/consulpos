import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ContribuyenteInterface } from '../../../../models/contribuyente';
import { EstadoInterface } from '../../../../models/estado';
import { CiudadInterface } from '../../../../models/ciudad';
import { ParroquiaInterface } from '../../../../models/parroquia';
import { MunicipioInterface } from '../../../../models/municipio';
import { ContactoInterface } from '../../../../models/contacto';
import { TipodocumentoInterface } from '../../../../models/tipo_documento';
import { RepresentanteInterface } from 'src/app/models/user';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from 'src/app/models/validacioncliente_response';
import { AddClientDecrypter, AddClientResponse } from 'src/app/models/add_clients_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ArchiveService } from 'src/app/shared/services/archive.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { ActividadComercialInterface } from '../../../../models/actividad_comercial';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { GeneroInterface } from '../../../../models/genero';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CeroValidator } from '../../../../shared/validators/cero.validator'
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import * as _ from 'lodash';
import { ClientesService } from 'src/app/shared/services/clientes.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {

  //----------- VARIABLES GLOBALES -----------\\
  validacionresponse: ValidacionclienteResponse;
  addClientResponse: AddClientResponse;
  loading = false;
  agents = [];
  search_client: boolean = true;
  formats: RepresentanteInterface[] = [];
  contribuyentes: ContribuyenteInterface[];
  profesiones: any[];
  t_docs_representantes: any[];
  estados: EstadoInterface[];
  municipios: MunicipioInterface[];
  parroquias: ParroquiaInterface[];
  ciudades: CiudadInterface[];
  contactos: ContactoInterface[];
  generos: GeneroInterface[];
  actividades_comerciales: ActividadComercialInterface[];
  tipos_clientes: any[];
  tipo_documentos: TipodocumentoInterface[];
  currentYear = new Date();
  identity;

  /////////////LOAD IMAGE///////////////
  default: DefaultResponse;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private archivo: ArchiveService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private modal: ModalService,
    private fb: FormBuilder,
    private cliente: ClientesService
  ) {

    this.identity = this.fb.group({
      tipo_doc: ['', [Validators.required]],
      rif: ['253862510', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]]
    },
      {
        validator: CeroValidator("rif")
      });
  }

  getDoc(): void {
    this.resetStatus()
    console.log(JSON.parse(this.storage.get(constant.T_DOCS)).t_docs.filter(c => c.t_doc == this.identity.get('tipo_doc').value)[0].clientes_por_documento);
    this.tipos_clientes = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs.filter(c => c.t_doc == this.identity.get('tipo_doc').value)[0].clientes_por_documento


  }

  client_type = new FormGroup({
    tipo_cliente: new FormControl('1', [Validators.required])
  });

  client = new FormGroup({
    razon_social: new FormControl('gergsgsgsgfdf', [Validators.required]),
    nombre_comercial: new FormControl('srgsdrgsgsrg', [Validators.required]),
    contribuyente: new FormControl('1', [Validators.required]),
    email: new FormControl('tha@g.com', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ]),
    phone_1: new FormControl('04242735855', [Validators.required]),
    phone_2: new FormControl('04242735855', [Validators.required]),
    estado: new FormControl('1', [Validators.required]),
    municipio: new FormControl('1', [Validators.required]),
    parroquia: new FormControl('1', [Validators.required]),
    ciudad: new FormControl('1', [Validators.required]),
    direccion: new FormControl('xfgdhedthdgdgrrsgsagr', [Validators.required]),
    contacto: new FormControl('1', [Validators.required]),
    codpostal: new FormControl('1080', [Validators.required]),
    act_comercial: new FormControl('1', [Validators.required]),
    pto_referencia: new FormControl('zdfgdsgdgdtsgddfthtdh', [Validators.required]),
    red_social_a: new FormControl(''),
    red_social_b: new FormControl(''),
  });

  data_vr = new FormGroup({
    primer_nombre: new FormControl('Arturo', [Validators.required]),
    segundo_nombre: new FormControl('Arturo',),
    primer_apellido: new FormControl('Arturo', [Validators.required]),
    segundo_apellido: new FormControl('Arturo',),
    c_t_doc_cedula: new FormControl('1', [Validators.required]),
    cedula: new FormControl('25386251', [Validators.required]),
    genero: new FormControl('1', [Validators.required]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    profesion: new FormControl('1', [Validators.required]),
  });

  document = new FormGroup({
    id: new FormControl(''),
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  agent = new FormGroup({
    p_nombre_representante: new FormControl('Arturo', [Validators.required]),
    s_nombre_representante: new FormControl('Jose', [Validators.required]),
    p_apellido_representante: new FormControl('Linares', [Validators.required]),
    s_apellido_representante: new FormControl('Viola', [Validators.required]),
    cedula_representante: new FormControl('25386251', [Validators.required]),
    telefono_local_repre: new FormControl('4242735855', [Validators.required]),
    telefono_movil_repre: new FormControl('4242735855', [Validators.required]),
    email_repre: new FormControl('tha@g.com', [Validators.required]),
    tipo_doc_rep: new FormControl('1', [Validators.required]),
  });

  add_agent() {
    var newFormat: RepresentanteInterface = {};
    var agente = new FormGroup({
      p_nombre_representante: new FormControl('', [Validators.required]),
      s_nombre_representante: new FormControl('', [Validators.required]),
      p_apellido_representante: new FormControl('', [Validators.required]),
      s_apellido_representante: new FormControl('', [Validators.required]),
      cedula_representante: new FormControl('', [Validators.required]),
      telefono_local_repre: new FormControl('', [Validators.required]),
      telefono_movil_repre: new FormControl('', [Validators.required]),
      email_repre: new FormControl('', [Validators.required]),
      tipo_doc_rep: new FormControl('', [Validators.required]),
    });
    this.agents.push(agente);
    this.formats.push(newFormat);
  }

  onlyNumberKey(event) {
    this.resetStatus()
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onlyCaracteres(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null :
      event.charCode >= 48 && event.charCode <= 57 ||
      event.charCode >= 64 && event.charCode <= 90 ||
      event.charCode >= 97 && event.charCode <= 122 ||
      event.charCode >= 45 && event.charCode <= 46 ||
      event.charCode == 95 || event.charCode == 241 ||
      event.charCode == 209;
  }

  getTipoCliente(): string {
    if (this.tipos_clientes && this.client_type.valid) {
      const resultado = this.tipos_clientes.filter(t => t.id == this.client_type.get('tipo_cliente').value)[0]
      if (!resultado) {
        return null
      }
      return resultado.identificador
    } return null
  }

  deleteAgent(index: number) {
    this.formats.splice(index, 1);
    this.agents.splice(index, 1);
  }

  verificar_usuario() {
    this.search_client = true;
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value;
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(rif),
    }))
    this.cliente.doVerificaicon(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse);
    
      this.search_client = this.validacionresponse.value_exists === "true" || this.validacionresponse.ACTIVO === "true" ? true : false;

      if (this.search_client) {
        this.identity.controls['rif'].setErrors({ 'existe': true });
      } else {
        this.identity.controls['rif'].setErrors({ 'existe': null });
        this.identity.controls['rif'].updateValueAndValidity()
      }
      this.loading = false
    })
  }

  submit() {
    this.search_client = true;
    var letra = this.identity.get("tipo_doc").value
    var rif = letra + this.identity.get('rif').value
    console.log(rif)
    var data: any = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      t_doc_id: this.crypto.encryptJson(this.identity.get('tipo_doc').value),
      rif: this.crypto.encryptJson(rif),
      t_cliente_id: this.crypto.encryptJson(this.client_type.get('tipo_cliente').value),
      razon_social: this.crypto.encryptJson(this.client.get('razon_social').value).trim(),
      comercio: this.crypto.encryptJson(this.client.get('nombre_comercial').value).trim(),
      contribuyente_id: this.crypto.encryptJson(this.client.get('contribuyente').value),
      email: this.crypto.encryptJson(this.client.get('email').value).trim(),
      estados: this.crypto.encryptJson(this.client.get('estado').value),
      municipios: this.crypto.encryptJson(this.client.get('municipio').value),
      parroquia_id: this.crypto.encryptJson(this.client.get('parroquia').value),
      ciudad_id: this.crypto.encryptJson(this.client.get('ciudad').value),
      cod_postal: this.crypto.encryptJson(this.client.get('codpostal').value),
      direccion: this.crypto.encryptJson(this.client.get('direccion').value),
      m_contacto_id: this.crypto.encryptJson(this.client.get('contacto').value),
      id_actividad_comercial: this.crypto.encryptJson(this.client.get('act_comercial').value),
      pto_ref: this.crypto.encryptJson(this.client.get('pto_referencia').value),
      red_social_a: this.crypto.encryptJson(this.client.get('red_social_a').value),
      red_social_b: this.crypto.encryptJson(this.client.get('red_social_b').value),
      localidad: this.crypto.encryptJson("Undefined"),
      telefonos: this.crypto.encryptJson(JSON.stringify([
        {
          number: this.client.get("phone_1").value.number,
          cod_area: this.client.get("phone_1").value.dialCode,
          iso: this.client.get("phone_1").value.countryCode
        },
        {
          number: this.client.get("phone_2").value.number,
          cod_area: this.client.get("phone_2").value.dialCode,
          iso: this.client.get("phone_2").value.countryCode
        }
      ]))
    }

    if (this.getTipoCliente() == 'J') {
      data = {
        ...data,
        legal: this.crypto.encryptJson(JSON.stringify(
          {
            l_p_nombre: this.agent.get('p_nombre_representante').value,
            l_s_nombre: this.agent.get('s_nombre_representante').value,
            l_p_apellido: this.agent.get('p_apellido_representante').value,
            l_s_apellido: this.agent.get('s_apellido_representante').value,
            r_t_doc_id: this.agent.get('tipo_doc_rep').value,
            r_doc: this.agent.get('cedula_representante').value,
            telefono_local_repre: this.agent.get('telefono_local_repre').value,
            telefono_movil_repre: this.agent.get('telefono_movil_repre').value,
            r_email: this.agent.get('email_repre').value,
            rif: this.agent.get('cedula_representante').value,
          }
        )),
        if_natural: this.crypto.encryptJson("false"),
        if_legal: this.crypto.encryptJson("true"),
      }
    } else if (this.getTipoCliente() == 'N' || this.getTipoCliente() == 'R') {
      data = {
        ...data,
        c_natural: this.crypto.encryptJson(JSON.stringify(
          {
            c_p_nombre: this.data_vr.get('primer_nombre').value,
            c_s_nombre: this.data_vr.get('segundo_nombre').value,
            c_p_apellido: this.data_vr.get('primer_apellido').value,
            c_s_apellido: this.data_vr.get('segundo_apellido').value,
            c_t_doc_id: this.data_vr.get('c_t_doc_cedula').value,
            c_doc: this.data_vr.get('cedula').value,
            id_genero: this.data_vr.get('genero').value,
            fecha_nacimiento: this.data_vr.get('fecha_nacimiento').value,
            id_profesion: this.data_vr.get('profesion').value,
            profesion: this.data_vr.get('profesion').value,
          }
        )),
        if_natural: this.crypto.encryptJson("true"),
        if_legal: this.crypto.encryptJson("false"),
      }
    }
    const dataS = this.crypto.encryptString(JSON.stringify(data));
    this.loading = true;
    this.cliente.doSave(`${this.session.getDeviceId()};${dataS}`).subscribe(res => {
      this.addClientResponse = new AddClientDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
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
    this.generos = JSON.parse(this.storage.get(constant.GENEROS)).generos
    this.profesiones = JSON.parse(this.storage.get(constant.PROFESIONES)).profesiones
    this.t_docs_representantes = JSON.parse(this.storage.get(constant.T_DOCS_REPRESENTANTES)).t_docs
  }

  getError() {
    return this.identity.errors?.['existe']
  }

  resetStatus() {
    this.search_client = true;
  }


  getEstado(id: any): void {
    this.municipios = JSON.parse(this.storage.get(constant.MUNICIPIOS)).municipios.filter(c => c.id_estado == id)
    this.ciudades = JSON.parse(this.storage.get(constant.CIUDADES)).ciudades.filter(c => c.id_estado == id)
    this.parroquias = JSON.parse(this.storage.get(constant.PARROQUIAS)).parroquias.filter(c => c.id_municipio == id)
  }

  getMunicipio(id: any): void {
    this.parroquias = JSON.parse(this.storage.get(constant.PARROQUIAS)).parroquias.filter(c => c.id_municipio == id)
  }

  // fileChangeEvent(fileInput: any) {
  //   console.log(fileInput.target.id);
  //   for (let index = 0; index < fileInput.target.files.length; index++) {
  //     const g = fileInput.target.files[index];
  //     console.log(g.name);
  //     var ext =  g.name.split('.').pop();
  //     console.log(ext);
  //   }

  //   this.imageError = null;
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     console.log(fileInput.target.files);
  //     // Size Filter Bytes
  //     const max_size = 20971520;
  //     const allowed_types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword'];
  //     const max_height = 15200;
  //     const max_width = 25600;
  //     /////////////////////////
  //     if (fileInput.target.files[0].size > max_size) {
  //       this.imageError =
  //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

  //       return false;
  //     }

  //     if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
  //       this.imageError = 'Solo imagenes ( JPG | PNG )';
  //       return false;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         const img_height = rs.currentTarget['height'];
  //         const img_width = rs.currentTarget['width'];

  //         console.log(img_height, img_width);


  //         if (img_height > max_height && img_width > max_width) {
  //           this.imageError =
  //             'Maximum dimentions allowed ' +
  //             max_height +
  //             '*' +
  //             max_width +
  //             'px';
  //           return false;
  //         } else {

  //           const imgBase64Path = e.target.result;
  //           this.cardImageBase64 = imgBase64Path;
  //           this.isImageSaved = true;
  //           // this.previewImagePath = imgBase64Path;
  //           this.upload(ext, fileInput.target.id)
  //         }

  //       };
  //     };
  //     reader.readAsDataURL(fileInput.target.files[0]);

  //   }

  // }

  // removeImage() {
  //   this.cardImageBase64 = null;
  //   this.isImageSaved = false;
  // }


  upload(d: any, id: string) {
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value;
    const encode = d.file.toString()
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      att_by: this.crypto.encryptJson("CLIENTE"),
      rif: this.crypto.encryptJson(rif),
      documento: this.crypto.encryptJson(id),
      extension: this.crypto.encryptJson(d.ext),
      t_sol_id: this.crypto.encryptJson(null),
      solicitud: this.crypto.encryptJson(null),
      file: this.crypto.encryptJson(encode),
    }))
    this.archivo.saveAttached(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default);
    })
  }

  save() {
    this.modal.confirm("Desea registrar este cliente?").subscribe(result => {
      if (result) {
        this.submit()
      }
    })
  }




}

