export interface ValidacionPedidosResponse {
    R?: string;
   
    pedidos:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionPedidosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionPedidosResponse {

        const verify: ValidacionPedidosResponse = {
            // R: value.R,
            
            pedidos: this.crypto.decryptJson(value.pedidos),
        }
        // console.log(verify)
        return verify
    }
}