import { RolInterface } from './rol';
import { TelefonoInterface } from './telefono';

export interface UserRequestInterface {

    p_nombre?: string;
    s_nombre?: string;
    p_apellido?: string;
    s_apellido?: string;
    t_doc?: string;
    t_doc_desc?: string;
    t_doc_id?: string;
    cedula?: string;
    email?: string;
    direccion?: string;
    pto_ref?: string;
    localidad?: string;
    cod_postal?: string;
    telefonos?: TelefonoInterface[];
    estado?: string;
    id_estado?: string;
    occ?: string;
    occ_id?: string;
    fecha_registro?: string;
    status_desc?: string;
    status_id?: string;
    comisionable?: string;
    psw?: string;
    rol_id?: string;
    rol_name?: string;
    rol?: RolInterface;
}