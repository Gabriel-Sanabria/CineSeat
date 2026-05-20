# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

---

## Producto

CineSeat es un software de reservación de asientos de cine con las siguientes funcionalidades principales:

- Alta y gestión de películas
- Programación de funciones en salas
- Selección y reserva de butacas
- Simulación de pagos
- Panel de dashboard con métricas (ocupación, recaudación, etc.)

**Dominio**: `Pelicula`, `Sala`, `Funcion`, `Asiento`, `Reserva`, `Pago`, `Usuario`.

---

## Stack

| Capa | Tecnología |
|---|---|
| Backend | .NET 10, ASP.NET Core Web API |
| Frontend | Angular 18.2.21 (NgModules, CSR) |
| ORM | Entity Framework Core (code-first) |
| Base de datos | SQL Server |
| Pruebas cliente | Karma + Jasmine |

La solución `CineSeat.slnx` contiene dos proyectos: `CineSeat.Server` (API) y `cineseat.client` (Angular).

---

## Configuración

- **EF Core**: Microsoft.EntityFrameworkCore 10.0.7 con SQL Server y Tools instalados
- **BCrypt**: BCrypt.Net-Next 4.1.0 — usado para hashear contraseñas de usuarios
- **OpenAPI**: activo en desarrollo (`GET /openapi/v1.json`)

## Comandos

```bash
# Aplicación completa (SPA Proxy lanza Angular automáticamente)
dotnet run --project CineSeat.Server

# Solo cliente Angular
cd cineseat.client && npm start

# Tests Angular
npm test
ng test --include src/app/ruta/al.spec.ts

# EF Core — migraciones y base de datos
dotnet ef migrations add <NombreMigracion> --project CineSeat.Server
dotnet ef database update --project CineSeat.Server
```

---

## Convenciones globales

- **Idioma**: todos los identificadores y comentarios en **español**, sin excepción. Los métodos no llevan sufijo `Async` aunque retornen `Task` — el tipo ya lo indica.
- **Estilo**: código limpio y sencillo; claridad sobre abstracciones prematuras.
- **Comentarios**: usar solo comentarios simples de línea (`//` en C#, `//` en TypeScript). No usar formatos especiales del editor como `/// <summary>` u otros bloques de documentación XML/JSDoc.
- **Un tipo por archivo**: cada archivo debe contener una sola clase, interfaz, DTO, enum o cualquier otra estructura de datos, sin excepción.
- **Validaciones en ambas capas**: el cliente valida para UX, el API siempre revalida.

## Orquestación de agentes

- Actúa siempre como **orquestador**: delega a los subagentes especializados (`frontend-dev`, `backend-dev`, `database-dev`), y NUNCA implementes tú mismo lo que corresponde a un agente.
- **Al delegar**, indica explícitamente a los subagentes que deben hacer uso de las skills correspondientes que tienen disponibles para resolver la tarea, también indicales que deben notificarte su trabajo realizado al finalizar sus tareas.
- **Paraleliza** al máximo: lanza subagentes independientes en un mismo mensaje siempre en modo background para no interrumpir tu flujo principal como orquestador; solo secuencia cuando hay dependencia real entre tareas.
- **Seguimiento**: para tareas de más de 2 pasos, mantén una lista de tareas activa y márcala conforme avanza cada subagente.
- **Comunicación**: siempre que un subagente te notifique que ha terminado una tarea, actualiza tu lista de tareas para reflejar el progreso y notifica al usuario sobre el avance general hasta ese momento. Al terminar todas las tareas, haz un resumen final desglosado de todos los cambios implementados.