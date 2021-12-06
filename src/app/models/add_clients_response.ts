export interface AddClientResponse {
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class AddClientDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AddClientResponse {

        const verify: AddClientResponse = {
            M: this.crypto.decryptJson(value.M),
            R: value.R,
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
        }
        
        console.log(verify)
        return verify
    }
}