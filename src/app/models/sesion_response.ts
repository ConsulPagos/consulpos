import { CryptoService } from "../shared/services/crypto.service";

export interface SesionResponse {
    scod?: string;
    R?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    M?: string;
}

export class SesionObject {

    private crypto: CryptoService = new CryptoService()

    deserialize(value: SesionResponse): SesionResponse {
        try {
            value.M = this.crypto.decryptJsonFixed(value.M)
            value.keyS = this.crypto.decryptJsonFixed(value.keyS)
            value.ivS = this.crypto.decryptJsonFixed(value.ivS)
            value.keyJ = this.crypto.decryptJsonFixed(value.keyJ)
            value.ivJ = this.crypto.decryptJsonFixed(value.ivJ)
            if(value.R == "0"){
                value.scod = this.crypto.decryptJsonFixed(value.scod)
            }
        
        } catch (error) {
            console.log(error)
        }
        return value
    }
}