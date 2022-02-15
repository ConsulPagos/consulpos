export interface ValidacionSimResponse {
    R?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    modelos:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionSimDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionSimResponse {

        const verify: ValidacionSimResponse = {
            // R: value.R,
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            modelos: this.crypto.decryptJson(value.modelos),
        }
        // console.log(verify)
        return verify
    }
}