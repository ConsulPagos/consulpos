export interface ValidacionSimResponse {
    R?: string;
   
    modelos:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionSimDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionSimResponse {

        const verify: ValidacionSimResponse = {
            // R: value.R,
            
            modelos: this.crypto.decryptJson(value.modelos),
        }
        // console.log(verify)
        return verify
    }
}