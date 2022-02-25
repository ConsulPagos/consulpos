export interface RefreshResponse {
    R?: string;
    M: string;
   
}

import { CryptoService } from "../shared/services/crypto.service";

export class RefreshDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): RefreshResponse {
        // console.log(this.crypto.decryptJson(value.M))
        const refresh: RefreshResponse = {
            M: this.crypto.decryptJson(value.M),
            R:value.R
        }
        return refresh
    }
}