import {AlmacenesRequestInterface} from './almacenes_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowAlmacenesResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    almacenes: AlmacenesRequestInterface[];
    total_row: string;
}

export class ShowAlmacenesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowAlmacenesResponse {

        const verify: ShowAlmacenesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            almacenes:JSON.parse(this.crypto.decryptJson(value.almacenes)) as AlmacenesRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}