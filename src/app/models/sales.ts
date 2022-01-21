import { ItemInterface } from './item';
export class SaleRequestInterface {
    id: number;
    afiliado: string;
    banco: string;
    codigo_banco: string;
    cuenta: string;
    fecha: string;
    fraccion_desc: string;
    fraccion_pago_id: string;
    items: ItemInterface[];
    number: string;
    solicitud_banco_id: string;
    status_desc: string;
    status_id: string;
}