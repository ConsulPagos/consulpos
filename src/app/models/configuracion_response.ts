import { CryptoService } from "../shared/services/crypto.service"

export interface ConfiguracionResponse {
    R?: string;
    M?: string;
    item?: any;
    session_valid?: string;
}

export class ConfiguracionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ConfiguracionResponse {

        const data: ConfiguracionResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            item: JSON.parse(this.crypto.decryptJson(value.item)),
        }
        return data
    }
}