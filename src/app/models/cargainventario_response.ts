import { CryptoService } from "../shared/services/crypto.service"

export interface CargaInventarioResponse {
    R?: string;
    session_valid?: string;
    M?: string;
    // item?: any;
}

export class CargaInventarioDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): CargaInventarioResponse {

        const data: CargaInventarioResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            // item: JSON.parse(this.crypto.decryptJson(value.item)),

        }
        return data
    }
}