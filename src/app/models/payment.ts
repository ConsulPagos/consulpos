export interface PaymentInterface {
    id?:number;
    created_at?:Date;
    id_pedido?:number;
    cash_recibido?:number;
    factura?:string;
    admin?:string;
    id_medio_pago?:number;
}