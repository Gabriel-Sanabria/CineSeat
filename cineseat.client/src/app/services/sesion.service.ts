import { Injectable } from '@angular/core';

// Servicio singleton que gestiona la sesión del usuario mediante cookies.
@Injectable({
  providedIn: 'root'
})
export class SesionServicio {

  // Nombre de la cookie donde se almacena el token JWT
  private readonly llave = 'cineseat_token';

  // Almacenar el token JWT en una cookie con disponibilidad estricta solo dentro de la aplicación.
  guardar(token: string): void {
    document.cookie = `${this.llave}=${token}; path=/; SameSite=Strict`;
  }

  // Busca la cookie por nombre dentro de la cadena de cookies del documento.
  obtener(): string | null {
    const coincidencia = document.cookie.split('; ').find(c => c.startsWith(`${this.llave}=`));
    return coincidencia ? coincidencia.split('=')[1] : null;
  }

  // Informa si el usuario tiene sesión activa comprobando que exista un token guardado
  estaAutenticado(): boolean {
    return this.obtener() !== null;
  }

  // Invalida la cookie estableciendo max-age=0, lo que obliga al navegador a eliminarla de inmediato
  cerrar(): void {
    document.cookie = `${this.llave}=; path=/; max-age=0`;
  }
}
