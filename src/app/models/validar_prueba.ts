import { CryptoService } from "../shared/services/crypto.service"

export interface ValidarPruebaResponse {
    R?: string;
    M?: string;
    items: any[];
}

export class ValidarPruebaDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidarPruebaResponse {

        const data: ValidarPruebaResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            items:JSON.parse(this.crypto.decryptJson(value.items)) as any[],
        }
        return data
    }
}