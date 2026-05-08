import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionServicio } from '../services/sesion.service';

// Interceptor HTTP que adjunta el token JWT a cada petición que se realice con el HttpClient de Angular.
@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

  constructor(private sesionServicio: SesionServicio) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Leer el token almacenado en la cookie de sesión
    const token = this.sesionServicio.obtener();

    // Si existe un token, clonar la petición original añadiendo la cabecera "Authorization: Bearer <token>"
    if (token)
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    // Continuar con la petición HTTP (con o sin el token, según corresponda)
    return next.handle(req);
  }
}
