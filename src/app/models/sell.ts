import { FormatInterface } from './format';

export interface SellInterface {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    id_transaccion?: number;
    id_presentacion?: number;
    unidades?: number;
    presentacion?:FormatInterface;
}


