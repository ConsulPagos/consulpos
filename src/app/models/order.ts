import { FormatInterface } from './format';
import { ProductInterface } from './product';

export interface OrderInterface {
    product?:ProductInterface;
    format?:FormatInterface;
    units?:number;
    descuento?:number;
}






