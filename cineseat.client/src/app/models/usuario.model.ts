export interface UsuarioSesion {
  token: string;
  id: number;
  correo: string;
}

export interface UsuarioCrear {
  correo: string;
  contrasena: string;
}
