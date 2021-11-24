import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CiudadInterface } from 'src/app/models/ciudad';
import { ContactoInterface } from 'src/app/models/contacto';
import { ContribuyenteInterface } from 'src/app/models/contribuyente';
import { EstadoInterface } from 'src/app/models/estado';
import { MunicipioInterface } from 'src/app/models/municipio';
import { ParroquiaInterface } from 'src/app/models/parroquia';
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Editar Cliente')
  }

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

  agent = new FormGroup({
    nombre_representante: new FormControl('', [Validators.required]),
    apellido_representante: new FormControl('', [Validators.required]),
    cedula_representante: new FormControl('', [Validators.required]),
    telefono_local_repre: new FormControl('', [Validators.required]),
    telefono_movil_repre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  contribuyentes: ContribuyenteInterface[];

  estados: EstadoInterface[];

  municipios: MunicipioInterface[];

  parroquias: ParroquiaInterface[];

  ciudades: CiudadInterface[];

  contactos: ContactoInterface[];

  tipo_documentos: TipodocumentoInterface[];

}
