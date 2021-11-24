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

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {

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

  client_type = new FormGroup({
    tipo_cliente: new FormControl('', [Validators.required]),
  });

  client = new FormGroup({
    rif: new FormControl('', [Validators.required]),
    tipo_doc: new FormControl('', [Validators.required]),
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
  });

  document = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

  agents = [];
  formats: RepresentanteInterface[]=[];

  add_agent() {
    var newFormat: RepresentanteInterface = {};

    // newFormat.nombre_representante = '';
    // newFormat.apellido_representante= '';
    // newFormat.cedula_representante= 0;
    // newFormat.telefono_local_repre= '';
    // newFormat.telefono_movil_repre= '';
    // newFormat.email= '';

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

  agent = new FormGroup({
    nombre_representante: new FormControl('', [Validators.required]),
    apellido_representante: new FormControl('', [Validators.required]),
    cedula_representante: new FormControl('', [Validators.required]),
    telefono_local_repre: new FormControl('', [Validators.required]),
    telefono_movil_repre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tipo_doc_rep: new FormControl('', [Validators.required]),
  });

  contribuyentes: ContribuyenteInterface[];

  estados: EstadoInterface[];

  municipios: MunicipioInterface[];

  parroquias: ParroquiaInterface[];
  ciudades: CiudadInterface[];
  contactos: ContactoInterface[];

  tipo_documentos: TipodocumentoInterface[];


  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Cliente')

    this.add_agent()
  }

  getTipoCliente(): string {
    if (this.client_type.valid) {
      return this.tipos_clientes.filter(t => t.id_tipo_cliente == this.client_type.get('tipo_cliente').value)[0].letra
    } return null
  }

  deleteAgent(index: number) {
    this.formats.splice(index, 1);
  }


}
