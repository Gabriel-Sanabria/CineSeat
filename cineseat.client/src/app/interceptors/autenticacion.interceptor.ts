import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Si se detecta una respuesta con status 401 (no autorizado) en cualquier solicitud HTTP, se asume que la sesión es inválida.
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.usuarioService.limpiarSesion(); // Limpiar cualquier indicador de sesión activa en los storages del navegador
          this.router.navigate(['/login'], { state: { sesionExpirada: true } }); // Redirigir al usuario a la página de login para que inicie sesión nuevamente
        }
        return throwError(() => error);
      })
    );
  }
}
