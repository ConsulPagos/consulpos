export interface ValidacionventaRese {
    R?: string;
    M?: string;
   
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
            
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        // console.log(verify)
        return verify
    }
}