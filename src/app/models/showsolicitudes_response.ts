import { CryptoService } from "../shared/services/crypto.service";

export interface ShowSolicitudesResponse {
    R?: string;
    M?: string;
   
    solicitudes: any[];
    total_row: string;
    session_valid?: string;
}

export class ShowSolicitudesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowSolicitudesResponse {

        const verify: ShowSolicitudesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            solicitudes:JSON.parse(this.crypto.decryptJson(value.solicitudes)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        // console.log(verify)
        return verify
    }
}