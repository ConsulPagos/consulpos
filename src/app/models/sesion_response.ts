import { CryptoService } from "../shared/services/crypto.service";

export interface SesionResponse {
    scod?: string;
    R?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    M?: string;
    u_id?: string;
    
}

export interface LogoutResponse {
    R?: string;
    M?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    u_id?: string;
}

export class SesionObject {

    constructor(private crypto: CryptoService){
        
    }

    deserialize(value: SesionResponse): SesionResponse {
        try {
            value.M = this.crypto.decryptJsonFixed(value.M)
            value.keyS = this.crypto.decryptJsonFixed(value.keyS)
            value.ivS = this.crypto.decryptJsonFixed(value.ivS)
            value.keyJ = this.crypto.decryptJsonFixed(value.keyJ)
            value.ivJ = this.crypto.decryptJsonFixed(value.ivJ)
            value.u_id = this.crypto.decryptJsonFixed(value.u_id)
            if(value.R == "0"){
                value.scod = this.crypto.decryptJsonFixed(value.scod)
            }
        
        } catch (error) {
            // console.log(error)
        }
        return value
    }

    logOutDecrypter(value: LogoutResponse): LogoutResponse {
        const refresh: LogoutResponse = {
            M: this.crypto.decryptJson(value.M),
            R:value.R,
        }
        return refresh
    }
}