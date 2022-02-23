import { CryptoService } from "../shared/services/crypto.service"

export interface ValidarPagosResponse {
    R?: string;
    M?: string;
    solicitud?: string;
}

export class ValidarPagosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidarPagosResponse {

        const data: ValidarPagosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            solicitud: this.crypto.decryptJson(value.solicitud),
        }
        return data
    }
}