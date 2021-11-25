import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ContribuyenteInterface } from '../../../../models/contribuyente'
import { EstadoInterface } from '../../../../models/estado'
import { CiudadInterface } from '../../../../models/ciudad'
import { ParroquiaInterface } from '../../../../models/parroquia'
import { MunicipioInterface } from '../../../../models/municipio'
import { ContactoInterface } from '../../../../models/contacto'
import { TipodocumentoInterface } from '../../../../models/tipo_documento'
import { TipoclienteInterface } from '../../../../models/tipo_cliente'
import { RepresentanteInterface } from 'src/app/models/user';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from 'src/app/models/validacioncliente_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {

  //----------- VARIABLES GLOBALES -----------\\
  validacionresponse: ValidacionclienteResponse;
  loading = false;
  agents = [];
  search_client: boolean = false;
  formats: RepresentanteInterface[] = [];
  contribuyentes: ContribuyenteInterface[];
  estados: EstadoInterface[];
  municipios: MunicipioInterface[];
  parroquias: ParroquiaInterface[];
  ciudades: CiudadInterface[];
  contactos: ContactoInterface[];

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private sesion: SesionService,
    private storage: StorageService,
  ) { }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FORM DEL PRIMER STEP
  identity = new FormGroup({

    rif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    tipo_doc: new FormControl('', [Validators.required]),
    search_client: new FormControl(this.search_client, [Validators.required]),

  });

  //FORM DEL SEGUNDO STEP
  client_type = new FormGroup({
    tipo_cliente: new FormControl('', [Validators.required]),
  });

  //FORM DEL TERCER STEP
  client = new FormGroup({
    razon_social: new FormControl('', [Validators.required]),
    nombre_comercial: new FormControl('', [Validators.required]),
    contribuyente: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    telefono_local: new FormControl('', [Validators.required]),
    telefono_movil: new FormControl('',[Validators.required]),
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    parroquia: new FormControl('', [Validators.required]),
    ciudad: new FormControl('',[Validators.required] ),
    direccion: new FormControl('', [Validators.required]),
    contacto: new FormControl('', [Validators.required]),
    codpostal: new FormControl('', [Validators.required]),
  });

  //FORM DEL CUARTO STEP
  document = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  tipo_cliente: string;
  tipos_clientes: TipoclienteInterface[] = [{
    id_tipo_cliente: 1,
    tipo_cliente: 'Jurídico',
    letra: 'J',
  },
  {
    id_tipo_cliente: 2,
    tipo_cliente: 'Natural',
    letra: 'N',
  },
  {
    id_tipo_cliente: 3,
    tipo_cliente: 'Fima Perosnal',
    letra: 'FP',
  }]

  tipo_documentos: TipodocumentoInterface[] = [{
    t_doc_id: 1,
    t_doc: 'V',
    t_doc_desc: 'venezolano',
  },
  {
    t_doc_id: 2,
    t_doc: 'J',
    t_doc_desc: 'juridico',
  }]

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
      return this.tipos_clientes.filter(t => t.id_tipo_cliente == this.client_type.get('tipo_cliente').value)[0].letra
    } return null
  }

  deleteAgent(index: number) {
    this.formats.splice(index, 1);
  }

  submit() {

    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    console.log(rif)

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson("1"),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),
    }))

    const IMEI = '13256848646454643'

    this.loading = true;

    console.log("verify")

    this.sesion.doVerificaicon(`${IMEI};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.search_client = this.validacionresponse.value_exists == "true" ? true : false;

      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Cliente')
    this.add_agent()
  }


}
