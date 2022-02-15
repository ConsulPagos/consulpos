import { CryptoService } from "../shared/services/crypto.service";
import {ItemInterface} from "./item";

export interface ShowItemResponse {
    value_exists: string;
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    session_valid: string;
    items: ItemInterface[];
    modelos: any[];
}

export class ShowItemDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowItemResponse {

        const verify: ShowItemResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            items:JSON.parse(this.crypto.decryptJson(value.items)) as ItemInterface[],
            modelos:JSON.parse(this.crypto.decryptJson(value.modelos)) as any[],
        }
        
        // console.log(verify)
        return verify
    }
}