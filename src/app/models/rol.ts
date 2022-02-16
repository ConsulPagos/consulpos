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


export class PermisoRoles {
    submodulo:    string;
    id_modulo:    number;
    permiso:      string;
    id:           number;
    id_submodulo: number;
    modulo:       string;
}


export class RolesInterface {
    id:       number;
    permisos: PermisoRoles[];
    rol:      string;
}