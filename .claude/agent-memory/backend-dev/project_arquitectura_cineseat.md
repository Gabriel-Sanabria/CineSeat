---
name: Arquitectura backend CineSeat
description: Entidades, servicios, autenticación JWT y estructura de capas implementadas en CineSeat.Server
type: project
---

## Estado actual de CineSeat.Server

### Entidades (Models/)
- `Usuario` — Id (PK), Correo (Required, MaxLength 100), Contrasena (Required, MaxLength 60, hash BCrypt)
- `Pelicula` — Id, Titulo (200), Genero (50), DuracionMinutos (int), Clasificacion (5), Director (100), Sinopsis (1000), Portada (byte[]?), MIMEPortada (string?), Funciones (ICollection<Funcion>)
- `Funcion` — Id, PeliculaId (FK), Sala (string 50, formato "Sala X"), Fecha (DateOnly), Hora (TimeOnly), Tipo (string 10), Precio (decimal 8,2), Pelicula, Reservas (ICollection<Reserva>)

### DbContext
- `AppDBContext` en `Data/AppDBContext.cs` — DbSet: Usuarios, Peliculas, Funciones, Reservas, AsientosReservados, Pagos

### DTOs (DTOs/)
- `UsuarioCrearDTO` — Correo, Contrasena, SesionMantenida
- `UsuarioActualDTO` — Id, Correo (respuesta pública)
- `PeliculaCrearDTO` — Titulo, Genero, Clasificacion, Director, Sinopsis, DuracionHoras, DuracionMinutos, Funciones (List<FuncionCrearDTO>)
- `PeliculaDTO` — Id, Titulo, Genero, Clasificacion, Director, Sinopsis, DuracionHoras, DuracionMinutos, UrlPortada, Funciones (List<FuncionDTO>)
- `FuncionCrearDTO` — Fecha (DateOnly), Hora (TimeOnly), Sala (int 1-10), Tipo, Precio, PeliculaId
- `FuncionDTO` — Id, PeliculaId, Sala (int), Fecha, Hora, Tipo, Precio

### Servicios (Services/)
- `ITokenServicio` / `TokenServicio` — genera JWT con claims Sub (id) y Email
- `IUsuarioServicio` / `UsuarioServicio` — Crear, ValidarCredenciales, CerrarSesion
- `IPeliculaServicio` / `PeliculaServicio` — Crear, ObtenerTodas, ObtenerPorId, Editar, Eliminar; privado MapearADTO
- `IFuncionServicio` / `FuncionServicio` — Crear, Editar, Eliminar; privado MapearADTO

### Convención clave: campo Sala
- En BD se guarda como string "Sala X" (ej. "Sala 3")
- En DTO se expone/recibe como int (ej. 3)
- Conversión: guardar → `$"Sala {dto.Sala}"`, leer → `int.Parse(f.Sala.Replace("Sala ", ""))`

### Controladores (Controllers/)
- `UsuariosController` — POST /api/usuarios, POST /api/usuarios/validar, POST /api/usuarios/cerrar-sesion
- `PeliculasController`:
  - POST /api/peliculas — [Authorize], 201 Created
  - GET /api/peliculas — público, 200
  - GET /api/peliculas/{id} — público, 200 o 404
  - GET /api/peliculas/{id}/portada — público, FileContentResult o 404; accede al DbContext directamente (projection, sin Include)
  - PUT /api/peliculas/{id} — [Authorize], 200 o 404
  - DELETE /api/peliculas/{id} — [Authorize], 204 o 404
- `FuncionesController`:
  - POST /api/funciones — [Authorize], 201 Created
  - PUT /api/funciones/{id} — [Authorize], 200 o 404
  - DELETE /api/funciones/{id} — [Authorize], 204 o 404

### Autenticación JWT (cookie HttpOnly)
- Cookie "cineseat_token", SameSite=Strict, Path=/
- SesionMantenida=true → expira 7 días; false → sesión
- OnMessageReceived lee token desde `Request.Cookies["cineseat_token"]`

### Program.cs — Servicios registrados
- `AddDbContext<AppDBContext>` con connection string "CineSeat"
- `AddScoped<ITokenServicio, TokenServicio>()`
- `AddScoped<IUsuarioServicio, UsuarioServicio>()`
- `AddScoped<IPeliculaServicio, PeliculaServicio>()`
- `AddScoped<IFuncionServicio, FuncionServicio>()`
- `AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(...)`
- Pipeline: `UseAuthentication()` antes de `UseAuthorization()`

**Why:** Arquitectura de capas estricta para mantener controllers sin lógica y servicios testeables.

**How to apply:** Al agregar endpoints protegidos, decorar con [Authorize]. Flujo: Entidad → DTOs → IServicio → Servicio → Controller → registro DI → migración EF Core.
