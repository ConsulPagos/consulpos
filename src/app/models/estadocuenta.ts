import { ItemEstadoCuentaInterface } from "./itemestadocuenta";

export interface EstadoCuentaInterface {
    total_debito: string;
    total_credito: string;
    items: ItemEstadoCuentaInterface[];
    rif: string;
}