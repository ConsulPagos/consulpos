import {CategoriaMod} from '../models/categoria_mods';
import {Categoria} from '../models/categoria';
import {Ciudades} from '../models/ciudades';
import {ContribuyenteInterface} from '../models/contribuyente';
import {EstadoInterface} from '../models/estado';
import {ContactoInterface} from '../models/contacto';
import {MarcaInterface} from '../models/marca';
import {ModeloInterface} from '../models/modelos';
import {MonedaInterface} from '../models/moneda';
import {MunicipioInterface} from '../models/municipio';
import {OperadoraInterface} from '../models/operadora';
import {PaisInterface} from '../models/pais';
import {ParroquiaInterface} from '../models/parroquia';
import {PlataformaInterface} from '../models/plataforma';
import {RolInterface} from '../models/rol';
import {TipoCobroInterface} from '../models/tipo_cobro';
import {TipodocumentoInterface} from '../models/tipo_documento';
import {PlanInterface} from '../models/plan';
import {BancoInterface} from '../models/banco';


export interface VerifyResponse {
    municipios:     MunicipioInterface[];
    contribuyentes: ContribuyenteInterface[];
    roles:          RolInterface[];
    datos:          string;
    has_keys:       string;
    bancos:         BancoInterface[];
    ciudades:       Ciudades[];
    operadoras:     OperadoraInterface[];
    categorias:     Categoria[];
    // t_pagos:        string;
    planes:         PlanInterface[];
    modelos:        ModeloInterface[];
    parroquias:     ParroquiaInterface[];
    m_contactos:    ContactoInterface[];
    paises:         PaisInterface[];
    estados:        EstadoInterface[];
    monedas:        MonedaInterface[];
    t_clientes:     string;
    occs:           string;
    plats:          PlataformaInterface[];
    categoria_mods: CategoriaMod[];
    t_cobros:       TipoCobroInterface[];
    t_docs:         TipodocumentoInterface[];
    marcas:         MarcaInterface[];

    R:              string;
    M:              string;
    keyS:           string;
    ivS:            string;
    keyJ:           string;
    ivJ:            string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class VerifyDecrypter {

    constructor(private crypto: CryptoService){

    }
    
    deserialize(value: any): VerifyResponse {

            const verify:VerifyResponse = {
                M:this.crypto.decryptJson(value.M),
                keyS:this.crypto.decryptString(value.keyS),
                ivS:this.crypto.decryptString(value.ivS),
                keyJ:this.crypto.decryptJson(value.keyJ),
                ivJ:this.crypto.decryptJson(value.ivJ),
    
                municipios:JSON.parse(this.crypto.decryptJson(value.municipios)),
                contribuyentes:JSON.parse(this.crypto.decryptJson(value.contribuyentes)),
                roles:JSON.parse(this.crypto.decryptJson(value.roles)),
                R:value.R,
                datos:JSON.parse(this.crypto.decryptJson(value.datos)),
                has_keys:this.crypto.decryptJson(value.has_keys),
                bancos:JSON.parse(this.crypto.decryptJson(value.bancos)),
                ciudades:JSON.parse(this.crypto.decryptJson(value.ciudades)),
                operadoras:JSON.parse(this.crypto.decryptJson(value.operadoras)),
                categorias:JSON.parse(this.crypto.decryptJson(value.categorias)),
                // t_pagos:JSON.parse(this.crypto.decryptJson(value.t_pagos)),
                planes:JSON.parse(this.crypto.decryptJson(value.planes)),
                modelos:JSON.parse(this.crypto.decryptJson(value.modelos)),
                parroquias:JSON.parse(this.crypto.decryptJson(value.parroquias)),
                m_contactos:JSON.parse(this.crypto.decryptJson(value.m_contactos)),
                paises:JSON.parse(this.crypto.decryptJson(value.paises)),
                estados:JSON.parse(this.crypto.decryptJson(value.estados)),
                monedas:JSON.parse(this.crypto.decryptJson(value.monedas)),
                t_clientes:JSON.parse(this.crypto.decryptJson(value.t_clientes)),
                occs:JSON.parse(this.crypto.decryptJson(value.occs)),
                plats:JSON.parse(this.crypto.decryptJson(value.plats)),
                categoria_mods:JSON.parse(this.crypto.decryptJson(value.categoria_mods)),
                t_cobros:JSON.parse(this.crypto.decryptJson(value.t_cobros)),
                t_docs:JSON.parse(this.crypto.decryptJson(value.t_docs)),
                marcas:JSON.parse(this.crypto.decryptJson(value.marcas))

                
            


        
        }
        console.log(verify)
        return verify
    }
}