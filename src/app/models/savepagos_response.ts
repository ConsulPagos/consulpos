import { CryptoService } from "../shared/services/crypto.service"

export interface SavePagosResponse {
    R?: string;
    M?: string;
    session_valid?: string;
}

export class SavePagosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): SavePagosResponse {

        const data: SavePagosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        return data
    }
}