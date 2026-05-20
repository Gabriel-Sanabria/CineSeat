---
name: Arquitectura backend CineSeat
description: Entidades, servicios, autenticación JWT y estructura de capas implementadas en CineSeat.Server
type: project
---

## Estado actual de CineSeat.Server

### Entidades (Models/)
- `Usuario` — Id (PK), Correo (Required, MaxLength 100), Contrasena (Required, MaxLength 60, hash BCrypt)

### DbContext
- `AppDBContext` en `Data/AppDBContext.cs` — DbSet<Usuario> Usuarios

### DTOs (DTOs/)
- `UsuarioCrearDTO` — Correo, Contrasena, SesionMantenida (con Data Annotations)
- `UsuarioSesionDTO` — Id, Correo, Token? (contrato interno servicio→controller; token nunca sale al cliente)
- `UsuarioInfoDTO` — Id, Correo (respuesta pública de API; sin token)

### Servicios (Services/)
- `ITokenServicio` / `TokenServicio` — genera JWT con claims Sub (id) y Email; lee config de Jwt:Llave/Emisor/Audiencia/ExpiracionHoras
- `IUsuarioServicio` / `UsuarioServicio` — Crear retorna `UsuarioSesionDTO`; ValidarCredenciales retorna `UsuarioSesionDTO` con token JWT; inyecta ITokenServicio

### Controladores (Controllers/)
- `UsuariosController`:
  - POST api/usuarios — crea usuario, escribe cookie HttpOnly "cineseat_token", retorna `UsuarioInfoDTO`
  - POST api/usuarios/validar — valida credenciales, escribe cookie HttpOnly "cineseat_token", retorna `UsuarioInfoDTO`
  - POST api/usuarios/cerrar-sesion — elimina cookie "cineseat_token", retorna 200 OK

### Autenticación JWT (cookie HttpOnly)
- El token se escribe como cookie HttpOnly con SameSite=Strict, Path=/
- Si `SesionMantenida` es true, la cookie expira en 7 días; de lo contrario es de sesión
- `OnMessageReceived` en JwtBearerEvents lee el token desde `Request.Cookies["cineseat_token"]`
- El token nunca se expone en el body de respuesta

### Program.cs
- Registrado: `AddDbContext<AppDBContext>` con connection string "CineSeat"
- Registrado: `AddScoped<ITokenServicio, TokenServicio>()`
- Registrado: `AddScoped<IUsuarioServicio, UsuarioServicio>()`
- Registrado: `AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(...)` con validación completa y evento OnMessageReceived para leer desde cookie
- Pipeline: `UseAuthentication()` antes de `UseAuthorization()`

### Configuración (appsettings.Development.json)
- Sección `Jwt`: Llave, Emisor ("CineSeat"), Audiencia ("CineSeat"), ExpiracionHoras (8)

**Why:** Autenticación JWT implementada para proteger endpoints futuros con [Authorize].

**How to apply:** Al agregar endpoints protegidos, decorar con [Authorize]. Al agregar nuevas entidades, seguir el flujo: Entidad → DTOs → IServicio → Servicio → Controller → registro DI → migración EF Core.
