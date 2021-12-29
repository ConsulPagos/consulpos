export interface ValidacionventaResponse {
    value_exists: string;
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    session_valid: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionventaDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionventaResponse {

        const verify: ValidacionventaResponse = {
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        console.log(verify)
        return verify
    }
}