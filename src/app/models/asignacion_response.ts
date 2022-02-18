import { CryptoService } from "../shared/services/crypto.service"

export interface AsignacionResponse {
    R?: string;
    M?: string;
    item?: any;
}

export class AsignacionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AsignacionResponse {

        const data: AsignacionResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
            item: JSON.parse(this.crypto.decryptJson(value.item)) ,
        }
        return data
    }
}