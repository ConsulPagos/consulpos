import { FormatInterface } from './format';
import { StockInterface } from './stock';

export interface ProductInterface {
    id?:number;
    created_at?:Date;
    updated_at?:Date;
    producto?: string;
    descripcion?: string;
    activo?: number;
    img_name?: string;
    tipo?: number;
    orden?: number;
    stock?: number;
    stock_real?: number;
    detalle?: string;
    numespecial?: number;
    vuelto?: number;
    precio_socio?:number;
    tipo_botella_id?: number;
    codigo_barra?: number;
    precio_especial?: number;
    precio_mvp?: number;
    cod_reporte?: number;
    estado?: number;
    format?:FormatInterface[];
    unidades_caja?: number;

}

export interface ShortProductInterface {
    id?:number;
    producto?: string;
    img_name?: string;
}