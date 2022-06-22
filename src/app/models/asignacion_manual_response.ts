import { CryptoService } from "../shared/services/crypto.service"

export interface AsignacionManualResponse {
    R?: string;
    M?: string;
    items?: any[];
    session_valid?: string;
    cod_serial?: string;
}

export class AsignacionManualDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): AsignacionManualResponse {

        const data: AsignacionManualResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            items: JSON.parse(this.crypto.decryptJson(value.items)),
            cod_serial: JSON.parse(this.crypto.decryptJson(value.cod_serial)),
        }
        return data
    }
}