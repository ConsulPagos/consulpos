import { CryptoService } from "../shared/services/crypto.service";

export interface PedidosResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    pedidos: any[];
    total_row: string;
}

export class PedidosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): PedidosResponse {

        const verify: PedidosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            pedidos:JSON.parse(this.crypto.decryptJson(value.pedidos)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}