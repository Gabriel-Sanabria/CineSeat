import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioCrear, UsuarioSesion } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL base para las peticiones al backend relacionadas con usuarios
  private readonly urlBase: string = 'api/usuarios';

  // Formato para validar correos electrónicos (expresión regular)
  private readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Inyección de dependencias del servicio
  constructor(private httpClient: HttpClient) { }

  crear(dto: UsuarioCrear): Observable<UsuarioSesion> {

    // Validación de campos antes de enviar la solicitud al backend
    const error = this.validarCampos(dto.correo, dto.contrasena);
    if (error)
      return throwError(() => ({ error: { mensaje: error } }));

    // Realizar la solicitud POST al backend para crear un nuevo usuario y retornar un observable con la respuesta
    return this.httpClient.post<UsuarioSesion>(this.urlBase, dto);
  }

  validarCredenciales(correo: string, contrasena: string): Observable<UsuarioSesion> {

    // Validación de campos antes de enviar la solicitud al backend
    const error = this.validarCampos(correo, contrasena);
    if (error)
      return throwError(() => ({ error: { mensaje: error } }));

    // Realizar la solicitud POST al backend para validar las credenciales y retornar un observable con la respuesta
    return this.httpClient.post<UsuarioSesion>(`${this.urlBase}/validar`, { correo, contrasena });
  }

  // --------- MÉTODOS AUXILIARES ---------
  private validarCampos(correo: string, contrasena: string): string | null {
    if (!correo || !contrasena) return 'Por favor, completa todos los campos.';
    if (!this.emailRegex.test(correo)) return 'El correo electrónico no tiene un formato válido.';
    if (contrasena.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    return null;
  }
}
