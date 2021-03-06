import {UserRequestInterface} from './user_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowUsersResponse {
    R?: string;
    M?: string;
   
    session_valid: string;
    value_exists: string;
    usuarios: UserRequestInterface[];
    total_row: string;
}

export class ShowUsersDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowUsersResponse {

        const verify: ShowUsersResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            usuarios:JSON.parse(this.crypto.decryptJson(value.usuarios)) as UserRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        // console.log(verify)
        return verify
    }
}