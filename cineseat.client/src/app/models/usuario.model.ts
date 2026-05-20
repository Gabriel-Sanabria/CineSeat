// Modelos de datos para usuarios
export interface UsuarioActual {
  id: number;
  correo: string;
}

export interface UsuarioCrear {
  correo: string;
  contrasena: string;
}
