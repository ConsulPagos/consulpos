import { ItemEstadoCuentaInterface } from "./itemestadocuenta";

export interface EstadoCuentaInterface {
    total_debito: number;
    total_credito: number;
    items: ItemEstadoCuentaInterface[];
    rif: string;
}