import { CryptoService } from "../shared/services/crypto.service";
import { EstadoCuentaInterface } from "./estadocuenta";

export interface StatusAccountResponse {
    R?: string;
    value_exists: string;
    session_valid: string;
    M?: string;
   
    estado_de_cuenta:EstadoCuentaInterface;
}

export class StatusAccountDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): StatusAccountResponse {

        const verify: StatusAccountResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            estado_de_cuenta:JSON.parse(this.crypto.decryptJson(value.estado_de_cuenta)) as EstadoCuentaInterface,
        }
        
        // console.log(verify)
        return verify
    }
}