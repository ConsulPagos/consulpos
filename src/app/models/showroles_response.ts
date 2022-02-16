// import {RolRequestInterface} from './rol';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowRolesResponse {
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    // roles: RolRequestInterface[];
    total_row: string;
}

export class ShowRolesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowRolesResponse {

        const verify: ShowRolesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            // roles:JSON.parse(this.crypto.decryptJson(value.roles)) as RolRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        // console.log(verify)
        return verify
    }
}