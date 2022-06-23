import { CryptoService } from "../shared/services/crypto.service"

export interface ActaResponse {
    R?: string;
    M?: string;
    t_sol_id?: string;
    path?: string;
    session_valid?: string;
    attached?: string;
    base64?: string;
    nombre?: string;
    rif?: string;
}

export class ActaDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ActaResponse {

        const data: ActaResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            t_sol_id: this.crypto.decryptJson(value.t_sol_id),
            path: this.crypto.decryptJson(value.path),
            session_valid: this.crypto.decryptJson(value.session_valid),
            attached: this.crypto.decryptJson(value.attached),
            base64: this.crypto.decryptJson(value.base64),
            nombre: this.crypto.decryptJson(value.nombre),
            rif: this.crypto.decryptJson(value.rif),
            
        }
        return data
    }
}