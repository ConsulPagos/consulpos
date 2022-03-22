export interface ValidacionCategoriasResponse {
    R?: string;
   
    categorias:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionCategoriasDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionCategoriasResponse {

        const verify: ValidacionCategoriasResponse = {
            // R: value.R,
            
            categorias: this.crypto.decryptJson(value.categorias),
        }
        // console.log(verify)
        return verify
    }
}