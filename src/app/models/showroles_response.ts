import {RolInterface} from './rol';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowRolesResponse {
    R?: string;
    M?: string;
   
    roles: RolInterface[];
    total_row: string;
}

export class ShowRolesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowRolesResponse {

        const verify: ShowRolesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
            roles:JSON.parse(this.crypto.decryptJson(value.roles)) as RolInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        // console.log(verify)
        return verify
    }
}