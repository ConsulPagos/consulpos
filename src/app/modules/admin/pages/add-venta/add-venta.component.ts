import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ModeloInterface } from '../../../../models/modelos'
import { PlataformaInterface } from '../../../../models/plataforma'
import { BancoInterface } from '../../../../models/banco'
import { ComunicacionInterface } from '../../../../models/tipo_comunicacion'
import { OperadoraInterface } from '../../../../models/operadora'
import { TipoCobroInterface } from '../../../../models/tipo_cobro'
import { PlanInterface } from '../../../../models/plan'
import { TipoventaInterface } from '../../../../models/tipo_venta'

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.scss']
})

export class AddVentaComponent implements OnInit {

  constructor(private title: Title) { }

  buy = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    plataforma: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    Numero_cuenta_pos: new FormControl('', [Validators.required]),
    precio_usd: new FormControl('', [Validators.required]),
    lugar_entrega: new FormControl('', [Validators.required]),
    comunicacion: new FormControl('', [Validators.required]),
    operadora: new FormControl('', [Validators.required]),
    tipocobro: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
  });

  venta = new FormGroup({
    tipo_venta: new FormControl('', [Validators.required]),
  });

  model = new FormGroup({

  });

  tipo_venta: string;
  tipos_ventas: TipoventaInterface[] = [{
    id_tipo_venta: 1,
    tipo_venta: 'Al contado',
  },
  {
    id_tipo_venta: 2,
    tipo_venta: '50/50',
  },
  {
    id_tipo_venta: 3,
    tipo_venta: 'Fraccionado',
  }]

  file = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

  modelos: ModeloInterface[] = [{
    id_modelo: 1,
    precio: 500,
    modelo: 'MF919',
    monto_inicial: 0,
    id_marca: 1,
    id_categoria: 1,
  },
  {
    id_modelo: 1,
    precio: 300,
    modelo: 'MP70',
    monto_inicial: 0,
    id_marca: 1,
    id_categoria: 1,
  }]

  plataformas: PlataformaInterface[] = [{
    id_plataforma: 1,
    plataforma: 'CREDICARD',
    descripcion: 'CREDICARD',
  },
  {
    id_plataforma: 2,
    plataforma: 'BNC',
    descripcion: 'BNC',
  }]

  bancos: BancoInterface[] = [{
    id_banco: 1,
    banco: 'BANCO DE VENEZUELA',
    codigo: '0102',
    id_plataforma: 1,
  },
  {
    id_banco: 2,
    banco: 'BANCO NACIONAL DE CREDITO',
    codigo: '0191',
    id_plataforma: 2,
  }]

  comunicaciones: ComunicacionInterface[] = [{
    id_comunicacion: 1,
    comunicacion: 'Wifi',
  },
  {
    id_comunicacion: 2,
    comunicacion: 'SimCard',
  }]

  operadoras: OperadoraInterface[] = [{
    id_operadora: 1,
    operadora: 'Digitel',
  },
  {
    id_operadora: 2,
    operadora: 'Movistar',
  }]

  tipocobros: TipoCobroInterface[] = [{
    id_tipo_cobro: 1,
    tipo_cobro: 'Domiciliado',
  },
  {
    id_tipo_cobro: 2,
    tipo_cobro: 'No Domiciliado',
  }]

  planes: PlanInterface[] = [{
    id_plan: 1,
    nombre: 'Básico',
    monto: 15,
    fecha_fin: new Date(),
    duracion: 1,
    id_tipo_cobro: 1,
  },
  {
    id_plan: 2,
    nombre: 'Premiun',
    monto: 35,
    fecha_fin: new Date(),
    duracion: 1,
    id_tipo_cobro: 1,
  },
  {
    id_plan: 2,
    nombre: 'Oro',
    monto: 25,
    fecha_fin: new Date(),
    duracion: 1,
    id_tipo_cobro: 1,
  },
  ]

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')
  }

}
