export interface DatosUserInterface {
    cedula: string;
    cod_postal: string;
    municipio: string;
    comisionable: string;
    correo: string;
    direccion: string;
    id_rol: number;
    localidad: string;
    p_apellido: string;
    p_nombre: string;
    permisos: PermisosInterface[];
    pto_ref: string;
    rol: string;
    s_apellido: string;
    s_nombre: string;
    status_desc: string;
    t_doc_desc: string;
    tlf: string;
    u_id: string;
}

export interface PermisosInterface {
    modulo:string;
    permiso:string;
    submodulo:string;
}