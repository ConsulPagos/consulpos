import { CryptoService } from "../shared/services/crypto.service"

export interface PruebaSimResponse {
    R?: string;
    M?: string;
    cod_serial?: string;
    session_valid?: string;
}

export class PruebaSimDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): PruebaSimResponse {

        const data: PruebaSimResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            cod_serial: this.crypto.decryptJson(value.cod_serial),
        }
        return data
    }
}