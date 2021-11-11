export interface UserInterface{
    correo ?:string;
    psw ?:string;
    lat ?:string;
    long ?:string;
    sist_op ?:string;
    modelo_disp ?:string;
}

export interface UserFormInterface{
    id_usuario?:number;
    email ?:string;
    primer_nombre ?:string;
    segundo_nombre ?:string;
    primer_apellido ?:string;
    segundo_apellido ?:string;
    cedula ?:string;
    id_rol ?:number;
    telefono ?:string;
    direccion ?:string;
    id_estado?:number;
    id_sucursal ?:number;
    access_level?: number;
}

export interface RepresentanteInterface{
    id_rep_legal?:number;
    doc_identidad ?:string;
    nombre_representante ?:string;
    apellido_representante ?:string;
    cedula_representante ?:number;
    email ?:string;
    telefono_local_repre ?:string;
    telefono_movil_repre ?:string;
}

