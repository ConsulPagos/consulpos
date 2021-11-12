import { CryptoService } from "../shared/services/crypto.service";

export interface VerifyResponse {
    scod?: string;
    R?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    M?: string;
}

export class VerifyObject {

    private crypto: CryptoService = new CryptoService()

    deserialize(value: VerifyResponse): VerifyResponse {
        try {
            value.M = this.crypto.decryptJson(value.M)
            value.keyS = this.crypto.decryptJson(value.keyS)
            value.ivS = this.crypto.decryptJson(value.ivS)
            value.keyJ = this.crypto.decryptJson(value.keyJ)
            value.ivJ = this.crypto.decryptJson(value.ivJ)
            if(value.R == "0"){
                value.scod = this.crypto.decryptJson(value.scod)
            }
        
        } catch (error) {
            console.log(error)
        }
        return value
    }
}