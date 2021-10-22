import { ProductInterface } from "./product";

export interface SalidaInterface {
    created_at?: Date;
    product?: ProductInterface;
    unidades?: number;
    unidades_inventario?:number;
    tipo?: string;
    id_pedido?: number;
    id_producto?: number;
    id_transaccion?: number;
    admin?:string;
  }