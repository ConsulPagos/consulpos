import { CategoriaMod } from '../models/categoria_mods';
import { CategoriaInterface } from '../models/categoria';
import { Ciudades } from '../models/ciudades';
import { ContribuyenteInterface } from '../models/contribuyente';
import { EstadoInterface } from '../models/estado';
import { ContactoInterface } from '../models/contacto';
import { MarcaInterface } from '../models/marca';
import { ModeloInterface } from '../models/modelos';
import { MonedaInterface } from '../models/moneda';
import { MunicipioInterface } from '../models/municipio';
import { OperadoraInterface } from '../models/operadora';
import { PaisInterface } from '../models/pais';
import { ParroquiaInterface } from '../models/parroquia';
import { PlataformaInterface } from '../models/plataforma';
import { RolInterface } from '../models/rol';
import { TipoCobroInterface } from '../models/tipo_cobro';
import { TipodocumentoInterface } from '../models/tipo_documento';
import { PlanInterface } from '../models/plan';
import { BancoInterface } from '../models/banco';
import { TipoPagoInterface } from '../models/tipo_pago';
import { OccInterface } from '../models/occ';
import { FraccionPagoInterface } from '../models/fraccion_pago';
import { TipoDiferidoInterface } from '../models/tipo_diferido';



export interface VerifyResponse {
    municipios: MunicipioInterface[];
    contribuyentes: ContribuyenteInterface[];
    roles: RolInterface[];
    //datos: string;
    //has_keys: string;
    bancos_fraccion: any[];
    bancos: BancoInterface[];
    ciudades: Ciudades[];
    operadoras: OperadoraInterface[];
    categorias: CategoriaInterface[];
    actividades_comerciales: ActividadComercialInterface[];
    planes: PlanInterface[];
    modelos: ModeloInterface[];
    parroquias: ParroquiaInterface[];
    m_contactos: ContactoInterface[];
    paises: PaisInterface[];
    estados: EstadoInterface[];
    monedas: MonedaInterface[];
    t_clientes: TipoclienteInterface[];
    t_pagos: TipoPagoInterface[];
    occs: OccInterface[];
    plataformas: PlataformaInterface[];
    categoria_mods: CategoriaMod[];
    t_cobros: TipoCobroInterface[];
    t_docs: TipodocumentoInterface[];
    marcas: MarcaInterface[];
    fracciones_pago: FraccionPagoInterface[];
    generos: GeneroInterface[];
    tipo_tasas: TipoTasasInterface[];
    tipos_diferido: TipoDiferidoInterface[];
    profesiones: any[];
    t_docs_representantes: any[];
    R: string;
    M: string;
    almacenes: any[];
    proveedores: any[];
    t_solicitudes: any[];

}

import { CryptoService } from "../shared/services/crypto.service";
import { ActividadComercialInterface } from './actividad_comercial';
import { TipoclienteInterface } from './tipo_cliente';
import { GeneroInterface } from './genero';
import { TipoTasasInterface } from './tipo_tasas';

export class VerifyDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): VerifyResponse {

        const verify: VerifyResponse = {
            M: this.crypto.decryptJson(value.M),
            municipios: JSON.parse(this.crypto.decryptJson(value.municipios)),
            contribuyentes: JSON.parse(this.crypto.decryptJson(value.contribuyentes)),
            roles: JSON.parse(this.crypto.decryptJson(value.roles)),
            R: value.R,
            //datos: JSON.parse(this.crypto.decryptJson(value.datos)),
            //has_keys: this.crypto.decryptJson(value.has_keys),
            bancos: JSON.parse(this.crypto.decryptJson(value.bancos)),
            ciudades: JSON.parse(this.crypto.decryptJson(value.ciudades)),
            operadoras: JSON.parse(this.crypto.decryptJson(value.operadoras)),
            categorias: JSON.parse(this.crypto.decryptJson(value.categorias)),
            t_pagos: JSON.parse(this.crypto.decryptJson(value.t_pagos)),
            planes: JSON.parse(this.crypto.decryptJson(value.planes)),
            modelos: JSON.parse(this.crypto.decryptJson(value.modelos)),
            parroquias: JSON.parse(this.crypto.decryptJson(value.parroquias)),
            m_contactos: JSON.parse(this.crypto.decryptJson(value.m_contactos)),
            paises: JSON.parse(this.crypto.decryptJson(value.paises)),
            estados: JSON.parse(this.crypto.decryptJson(value.estados)),
            monedas: JSON.parse(this.crypto.decryptJson(value.monedas)),
            t_clientes: JSON.parse(this.crypto.decryptJson(value.t_clientes)),
            occs: JSON.parse(this.crypto.decryptJson(value.occs)),
            plataformas: JSON.parse(this.crypto.decryptJson(value.plataformas)),
            categoria_mods: JSON.parse(this.crypto.decryptJson(value.categoria_mods)),
            t_cobros: JSON.parse(this.crypto.decryptJson(value.t_cobros)),
            t_docs: JSON.parse(this.crypto.decryptJson(value.t_docs)),
            marcas: JSON.parse(this.crypto.decryptJson(value.marcas)),
            actividades_comerciales: JSON.parse(this.crypto.decryptJson(value.actividades_comerciales)),
            fracciones_pago: JSON.parse(this.crypto.decryptJson(value.fracciones_pago)),
            generos: JSON.parse(this.crypto.decryptJson(value.generos)),
            tipo_tasas: JSON.parse(this.crypto.decryptJson(value.tipo_tasas)),
            tipos_diferido: JSON.parse(this.crypto.decryptJson(value.tipos_diferido)),
            profesiones: JSON.parse(this.crypto.decryptJson(value.profesiones)),
            t_docs_representantes: JSON.parse(this.crypto.decryptJson(value.t_docs_representantes)),
            almacenes: JSON.parse(this.crypto.decryptJson(value.almacenes)),
            proveedores: JSON.parse(this.crypto.decryptJson(value.proveedores)),
            t_solicitudes: JSON.parse(this.crypto.decryptJson(value.t_solicitudes)),
            bancos_fraccion: JSON.parse(this.crypto.decryptJson(value.bancos_fraccion)),
        }
        console.log(verify)
        return verify
    }
}