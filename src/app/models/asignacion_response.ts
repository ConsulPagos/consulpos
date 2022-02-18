import { CryptoService } from "../shared/services/crypto.service"

export interface AsignacionResponse {
    R?: string;
    M?: string;
    items?: any[];
    session_valid?: string;
}

export class AsignacionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AsignacionResponse {

        const data: AsignacionResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            items: JSON.parse(this.crypto.decryptJson(value.items)),
        }
        return data
    }
}