---
name: Sistema de autenticación JWT de CineSeat
description: Detalles clave del sistema JWT: cookie HttpOnly, UsuarioService unificado, AutenticacionInterceptor activo, doble expiración sesión normal vs. extendida.
type: project
---

El sistema JWT usa `ExpiracionHoras` (0.5 = 30 minutos) para sesiones normales y `ExpiracionHorasExtendida` (168 = 7 días) cuando el usuario marca "Mantener sesión iniciada". Ambos valores viven bajo la clave `Jwt` en `appsettings.Development.json`.

`TokenServicio` tiene dos métodos: `GenerarComoCookie(usuario, sesionMantenida)` escribe el JWT directamente como cookie `cineseat_token` con `HttpOnly = true` y `SameSite = Strict` en la respuesta HTTP. `EliminarCookie()` borra esa cookie. El token nunca aparece en el body de la respuesta.

El middleware `JwtBearer` lee el token desde `Request.Cookies["cineseat_token"]` en lugar del header `Authorization` (configurado con `OnMessageReceived`).

El único servicio de autenticación del frontend es `UsuarioService`, que tiene: `validarCredenciales()`, `crear()`, `guardarSesion(id, sesionMantenida)`, `haySesionActiva()`, `limpiarSesion()`, `cerrarSesion()`. `limpiarSesion()` es un método público que solo limpia ambos storages; `cerrarSesion()` llama a la API y delega en `limpiarSesion()`.

`guardarSesion(id, correo, sesionMantenida)` serializa `{ id, correo }` como JSON bajo la clave `cineseat_sesion` y lo escribe en `localStorage` (sesión mantenida) o `sessionStorage` (sesión normal). `obtenerDatosSesion()` lee y deserializa ese JSON, retornando `UsuarioActual | null`. `haySesionActiva()` comprueba la existencia de la clave en ambos storages.

Existe `AutenticacionInterceptor` en `interceptors/autenticacion.interceptor.ts`, registrado en `app.module.ts` con `multi: true`. Captura respuestas `401`, llama a `usuarioService.limpiarSesion()` y navega a `/login` con `{ state: { sesionExpirada: true } }`. Propaga siempre el error.

`autenticacionGuard` también navega a `/login` con `{ state: { sesionExpirada: true } }` cuando no hay sesión.

`LoginComponent` implementa `ngOnInit` con dos responsabilidades: redirigir a `/cartelera` si hay sesión activa, y mostrar un toast de advertencia ("Tu sesión ha expirado.") si `history.state?.sesionExpirada` es `true` — estado inyectado tanto por el interceptor como por el guard.

El DTO de respuesta es `UsuarioActualDTO` con `Id` y `Correo`. Ya no existe `UsuarioSesionDTO`.

Endpoints en `UsuariosController`: `POST /api/usuarios` (registro), `POST /api/usuarios/validar` (login), `POST /api/usuarios/cerrar-sesion` (logout).

**Why:** Refactors importantes después de la implementación inicial: la cookie pasó a ser HttpOnly, `SesionServicio` se eliminó y sus responsabilidades se consolidaron en `UsuarioService`. Luego se agregó `AutenticacionInterceptor` para manejar expiración de sesión en cualquier petición HTTP, y `limpiarSesion()` se extrajo para ser reutilizable desde el interceptor sin duplicar lógica.

**How to apply:** Al documentar autenticación, verificar siempre el código de `TokenServicio`, `UsuarioService` y `AutenticacionInterceptor`. `sesion.service.ts` y `UsuarioSesionDTO.cs` ya no existen.
