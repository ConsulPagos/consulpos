import { ProductInterface } from './product';

export interface FormatInterface {
    id?:number;
    created_at?:Date;
    updated_at?:Date;
    id_producto?: number;
    descripcion?: string;
    precio?: number;
    unidades?: number;
    activo?:number;
    producto?:ProductInterface;
}