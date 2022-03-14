import { CryptoService } from "../shared/services/crypto.service";

export interface ShowModelosResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    modelos: any[];
    total_row: string;
}

export class ShowModelosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowModelosResponse {

        const verify: ShowModelosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            modelos:JSON.parse(this.crypto.decryptJson(value.modelos)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}