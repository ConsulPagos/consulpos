export interface ValidacionMarcaResponse {
    R?: string;
   
    marcas:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionMarcaDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionMarcaResponse {

        const verify: ValidacionMarcaResponse = {
            // R: value.R,
            
            marcas: this.crypto.decryptJson(value.marcas),
        }
        // console.log(verify)
        return verify
    }
}