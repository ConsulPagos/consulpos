export interface ValidacionOccResponse {
    R?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    occ_usuarios:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionOccDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionOccResponse {

        const verify: ValidacionOccResponse = {
            // R: value.R,
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            occ_usuarios: this.crypto.decryptJson(value.occ_usuarios),
        }
        // console.log(verify)
        return verify
    }
}