import { CryptoService } from "../shared/services/crypto.service";

export interface ShowPlataformasResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    plataformas: any[];
    total_row: string;
}

export class ShowPlataformasDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowPlataformasResponse {

        const verify: ShowPlataformasResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            plataformas:JSON.parse(this.crypto.decryptJson(value.plataformas)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}