export interface RefreshResponse {
    R?: string;
    M: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class RefreshDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): RefreshResponse {
        console.log(this.crypto.decryptJsonFixed(value.M))
        const refresh: RefreshResponse = {
            M: this.crypto.decryptJsonFixed(value.M),
            keyS: this.crypto.decryptStringFixed(value.keyS),
            ivS: this.crypto.decryptStringFixed(value.ivS),
            keyJ: this.crypto.decryptJsonFixed(value.keyJ),
            ivJ: this.crypto.decryptJsonFixed(value.ivJ),
            R:value.R
        }
        return refresh
    }
}