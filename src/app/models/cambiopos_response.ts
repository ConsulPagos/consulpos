import { CryptoService } from "../shared/services/crypto.service"

export interface CambioPosResponse {
    R?: string;
    M?: string;
    item?: any;
}

export class CambioPosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): CambioPosResponse {

        const data: CambioPosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            item: JSON.parse(this.crypto.decryptJson(value.item)),
        }
        return data
    }
}