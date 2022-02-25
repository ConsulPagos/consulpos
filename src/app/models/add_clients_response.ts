export interface AddClientResponse {
    R?: string;
    M?: string;
   
}

import { CryptoService } from "../shared/services/crypto.service";

export class AddClientDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AddClientResponse {

        const verify: AddClientResponse = {
            M: this.crypto.decryptJson(value.M),
            R: value.R,
            
        }
        
        console.log(verify)
        return verify
    }
}