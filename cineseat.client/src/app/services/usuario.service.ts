import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioCrear, UsuarioActual } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL base para las peticiones al backend relacionadas con usuarios
  private readonly urlBase: string = 'api/usuarios';

  // Formato para validar correos electrónicos (expresión regular)
  private readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clave usada para guardar el indicador de sesión activa en storage
  private readonly llave = 'cineseat_sesion';

  // Inyección de dependencias del servicio
  constructor(private httpClient: HttpClient) { }

  crear(dto: UsuarioCrear): Observable<UsuarioActual> {

    // Validación de campos antes de enviar la solicitud al backend
    const error = this.validarCampos(dto.correo, dto.contrasena);
    if (error)
      return throwError(() => ({ error: { mensaje: error } }));

    // Realizar la solicitud POST al backend para crear un nuevo usuario y retornar un observable con la respuesta
    return this.httpClient.post<UsuarioActual>(this.urlBase, dto);
  }

  validarCredenciales(correo: string, contrasena: string, sesionMantenida: boolean = false): Observable<UsuarioActual> {

    // Validación de campos antes de enviar la solicitud al backend
    const error = this.validarCampos(correo, contrasena);
    if (error)
      return throwError(() => ({ error: { mensaje: error } }));

    // Realizar la solicitud POST al backend para validar las credenciales y retornar un observable con la respuesta
    return this.httpClient.post<UsuarioActual>(`${this.urlBase}/validar`, { correo, contrasena, sesionMantenida });
  }

  // Guarda el id en el en el sessionStorage o localStorage (si la sesión es mantenida) o como indicador de sesión activa.
  guardarSesion(id: number, sesionMantenida: boolean = false): void {
    const valor = id.toString();
    if (sesionMantenida) {
      localStorage.setItem(this.llave, valor);
    } else {
      sessionStorage.setItem(this.llave, valor);
    }
  }

  // Retorna true si existe algún indicador de sesión activa en cualquiera de los dos storages
  haySesionActiva(): boolean {
    return localStorage.getItem(this.llave) !== null || sessionStorage.getItem(this.llave) !== null;
  }

  limpiarSesion(): void {
    // Remover el indicador de sesión activa de ambos storages para asegurar que no quede rastro de la sesión iniciada
    localStorage.removeItem(this.llave);
    sessionStorage.removeItem(this.llave);
  }

  // Llama al backend para eliminar la cookie y limpia el indicador de sesión de ambos storages
  cerrarSesion(): void {
    this.httpClient.post(`${this.urlBase}/cerrar-sesion`, {}).subscribe();
    this.limpiarSesion();
  }

  // --------- MÉTODOS AUXILIARES ---------
  private validarCampos(correo: string, contrasena: string): string | null {
    if (!correo || !contrasena) return 'Por favor, completa todos los campos.';
    if (!this.emailRegex.test(correo)) return 'El correo electrónico no tiene un formato válido.';
    if (contrasena.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    return null;
  }
}
