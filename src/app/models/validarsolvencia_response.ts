import { CryptoService } from "../shared/services/crypto.service"

export interface ValidarSolvenciaResponse {
    R?: string;
    M?: string;
    solvente?: string;
    deuda?: string;
    abono?: string;
}

export class ValidarSolvenciaDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidarSolvenciaResponse {

        const data: ValidarSolvenciaResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            deuda: this.crypto.decryptJson(value.deuda),

            abono: this.crypto.decryptJson(value.abono),
            solvente: this.crypto.decryptJson(value.solvente),

        }
        return data
    }
}