import { CryptoService } from "../shared/services/crypto.service";

export interface ConfigResponseResponse {
    R?: string;
    M?: string;
    total_row: string;
    session_valid?: string;
    equipos: any[];
}

export class ConfigresponseDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ConfigResponseResponse {

        const verify: ConfigResponseResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            total_row: this.crypto.decryptJson(value.total_row),
            session_valid: this.crypto.decryptJson(value.session_valid),
            equipos:JSON.parse(this.crypto.decryptJson(value.equipos)) as any[],
        }
        // console.log(verify)
        return verify
    }
}