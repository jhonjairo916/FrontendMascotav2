export class UsuarioModelo{
    id?:String;
    username?: String;
    clave?: String;
    idPersona?: number;
    telefono?: String;
    user?:UsuarioModelo;
    token?:String;
    isLoggedIn: boolean = false;
}