import { CryptoService } from "../shared/services/crypto.service";

export interface SesionResponse {
    scod?: string;
    R?: string;
    permisos?: any;
    M?: string;
    u_id?: string;

}

export interface LogoutResponse {
    R?: string;
    M?: string;
    u_id?: string;
}

export class SesionObject {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: SesionResponse): SesionResponse {
        try {
            value.M = this.crypto.decryptJson(value.M)
            value.permisos = JSON.parse(this.crypto.decryptJson(value.permisos))
            value.u_id = this.crypto.decryptJson(value.u_id)
            if (value.R == "0") {
                value.scod = this.crypto.decryptJson(value.scod)
            }

        } catch (error) {
            // console.log(error)
        }
        return value
    }

    logOutDecrypter(value: LogoutResponse): LogoutResponse {
        const refresh: LogoutResponse = {
            M: this.crypto.decryptJson(value.M),
            R: value.R,
        }
        return refresh
    }
}