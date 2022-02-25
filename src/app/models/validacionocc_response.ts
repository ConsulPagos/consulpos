export interface ValidacionOccResponse {
    R?: string;
   
    occ_usuarios:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionOccDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionOccResponse {

        const verify: ValidacionOccResponse = {
            // R: value.R,
            
            occ_usuarios: this.crypto.decryptJson(value.occ_usuarios),
        }
        // console.log(verify)
        return verify
    }
}