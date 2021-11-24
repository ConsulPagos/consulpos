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
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { constant } from 'src/app/shared/utils/constant';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.scss']
})

export class AddVentaComponent implements OnInit {

  loading = false;

  constructor(private title: Title, private crypto: CryptoService, private sesion: SesionService, private storage: StorageService) { }

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
  tipos_ventas: TipoventaInterface[];

  file = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

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

  client_type = new FormGroup({
    rif: new FormControl('', [Validators.required]),
    tipo_doc: new FormControl('', [Validators.required]),
  });

  tipo_cliente: string;
  tipos_clientes: TipoclienteInterface[];

  modelos: ModeloInterface[];

  plataformas: PlataformaInterface[];

  bancos: BancoInterface[];

  comunicaciones: ComunicacionInterface[];

  operadoras: OperadoraInterface[];

  tipocobros: TipoCobroInterface[];

  planes: PlanInterface[];

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')

  }

  submit() {

    var rif = this.client_type.get('tipo_doc').value + this.client_type.get('rif').value
    console.log(rif)

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson("1"),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson('J253862510'),
    }))

    const IMEI = '13256848646454643'

    this.loading = true;

    console.log("verify")

    this.sesion.doVerificaicon(`${IMEI};${data}`).subscribe(res => {
      // var verifyResponse = new VerifyDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

      // this.loading = false
      // this.storage.store(constant.BANCOS, JSON.stringify(verifyResponse.bancos))
      // this.crypto.setKeys(verifyResponse.keyS, verifyResponse.ivJ, verifyResponse.keyJ, verifyResponse.ivS)
    })
  }

}
