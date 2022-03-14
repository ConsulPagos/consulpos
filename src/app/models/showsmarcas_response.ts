import { CryptoService } from "../shared/services/crypto.service";

export interface ShowMarcasResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    marcas: any[];
    total_row: string;
}

export class ShowMarcasDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowMarcasResponse {

        const verify: ShowMarcasResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            marcas:JSON.parse(this.crypto.decryptJson(value.marcas)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}