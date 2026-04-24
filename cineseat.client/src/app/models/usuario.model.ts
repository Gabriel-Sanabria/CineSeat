export interface UsuarioRespuesta {
  id: number;
  correo: string;
}

export interface UsuarioCrear {
  correo: string;
  contrasena: string;
}
