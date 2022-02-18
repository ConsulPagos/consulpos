import { CryptoService } from "../shared/services/crypto.service"

export interface DefaultResponse {
    R?: string;
    M?: string;
 
}

export class DefaultDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): DefaultResponse {

        const data: DefaultResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
        }
        return data
    }
}