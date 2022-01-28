export interface ValidacionventaRese {
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    session_valid: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionventadosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionventaRese {

        const verify: ValidacionventaRese = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        // console.log(verify)
        return verify
    }
}