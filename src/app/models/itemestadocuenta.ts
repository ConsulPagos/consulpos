export interface ItemEstadoCuentaInterface {
    total_debito: number;
    cod_serial: string;
    fecha: Date;
    total_credito: number;
    concepto: string;
    saldo: string;
    modelo: string;
    total_deuda: string;
    t_cobro: string;
    id_diferido?: string;
    id_estado_cuenta: number;
}