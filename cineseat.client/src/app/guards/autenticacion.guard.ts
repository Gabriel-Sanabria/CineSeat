import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionServicio } from '../services/sesion.service';

// Guard ejecutado al activar una ruta que requiere sesión iniciada.
export const autenticacionGuard: CanActivateFn = () => {

  // Obtener dependencias
  const sesionServicio = inject(SesionServicio);
  const router = inject(Router);

  // Si existe un token válido en la cookie, se permite el acceso a la ruta
  if (sesionServicio.estaAutenticado()) return true;

  // Si no se detecta sesión activa, se redirige al usuario a la página de login y se cancela la navegación
  router.navigate(['/login']);
  return false;
};
