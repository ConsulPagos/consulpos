export interface ValidacionOccResponse {
    value_exists: string;
    R?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    session_valid: string;
    occ_usuarios:any;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionOccDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionOccResponse {

        const verify: ValidacionOccResponse = {
            R: value.R,
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            occ_usuarios: this.crypto.decryptJson(value.occ_usuarios),
        }
        // console.log(verify)
        return verify
    }
}