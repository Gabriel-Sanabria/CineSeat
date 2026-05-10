import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

// Guard ejecutado al activar una ruta que requiere sesión iniciada.
export const autenticacionGuard: CanActivateFn = () => {

  // Obtener dependencias
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  // Si existe un indicador de sesión activa, se permite el acceso a la ruta
  if (usuarioService.haySesionActiva()) return true;

  // Si no se detecta sesión activa, se redirige al usuario a la página de login y se cancela la navegación
  router.navigate(['/login']);
  return false;
};
