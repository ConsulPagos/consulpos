export interface UserInterface{
    correo ?:string;
    pws ?:string;
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