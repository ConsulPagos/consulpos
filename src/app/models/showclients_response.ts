import {ClienteRequestInterface} from '../models/cliente_request';

export interface ShowClientsResponse {
    value_exists: string;
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    session_valid: string;
    clientes: ClienteRequestInterface[];
}

import { CryptoService } from "../shared/services/crypto.service";

export class ShowClientsDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowClientsResponse {

        const verify: ShowClientsResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            clientes:JSON.parse(this.crypto.decryptJson(value.clientes)) as ClienteRequestInterface[],

        }
        
        console.log(verify)
        return verify
    }
}