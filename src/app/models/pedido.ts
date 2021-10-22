export interface PedidoInterface {
    id?:number;
    created_at?:Date;
    updated_at?:Date;
    approved_at?:Date;
    id_afiliado?:number;
    id_transaccion?:number;
    total?:number;
    estado?:string;
    aceptado?:number;
    id_direccion?:number;
    pistoleado?:number;
    id_medio_pago?:number;
    programar_entrega?:Date;
    limite_credito?:Date;
    cobrado?:number;
    descuento?:number;
}