import { CryptoService } from "../shared/services/crypto.service"

export interface ConfigResponse {
    R?: string;
    // M?: string;
    session_valid?: string;
    transaccion?: any[]
}

export class ConfigDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ConfigResponse {

        const data: ConfigResponse = {
            R: value.R,
            // M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            transaccion:JSON.parse(this.crypto.decryptJson(value.transaccion)) as any[],
        }
        return data
    }
}