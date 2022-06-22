export interface ValidacionclienteResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    afiliado?: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionclienteDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionclienteResponse {

        const verify: ValidacionclienteResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            afiliado: this.crypto.decryptJson(value.afiliado),
        }
        // console.log(verify)
        return verify
    }
}