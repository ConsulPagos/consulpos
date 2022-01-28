export class Permiso {
    id_permiso: number;
    modulo: string;
    id_modulo: number;
}

export class RolInterface {
    rol_id: number;
    permisos: Permiso[];
    rol_name: string;
}

export class RolRequestInterface {
    rol_id: number;
    permisos: Permiso[];
    rol_name: string;
    rol_descripcion: string;
}