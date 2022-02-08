import { CryptoService } from "../shared/services/crypto.service"

export interface AsignacionResponse {
    R?: string;
    M?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    item?: any;
}

export class AsignacionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AsignacionResponse {

        const data: AsignacionResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            item: JSON.parse(this.crypto.decryptJson(value.item)) ,
        }
        return data
    }
}