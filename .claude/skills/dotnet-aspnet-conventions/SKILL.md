---
name: dotnet-aspnet-conventions
description: .NET 10 and ASP.NET Core Web API conventions, layered architecture, naming patterns and best practices for CineSeat backend. Use when creating controllers, services, DTOs or wiring dependency injection.
user-invocable: false
disable-model-invocation: false
---

# Convenciones .NET 10 / ASP.NET Core — CineSeat

## Arquitectura por capas

```
CineSeat.Server/
├── Controllers/   → Orquestación HTTP. Sin lógica de negocio.
├── Services/      → Interfaces + implementaciones. Reglas de negocio.
├── Models/        → Entidades EF Core (code-first).
└── DTOs/          → Contratos de la API (Request / Response).
```

Acceso a datos directamente vía `DbContext`. Solo introducir repositorios si el agregado lo justifica.

---

## Naming (todo en español)

| Artefacto | Patrón | Ejemplo |
|---|---|---|
| Entidad | Sustantivo singular PascalCase | `Pelicula`, `Funcion` |
| DTO request | Verbo + entidad + `Request` | `CrearPeliculaRequest` |
| DTO response | Entidad + `Response` | `PeliculaResponse` |
| Interfaz servicio | `I` + entidad + `Servicio` | `IPeliculaServicio` |
| Implementación | Entidad + `Servicio` | `PeliculaServicio` |
| Controller | Entidad en plural + `Controller` | `PeliculasController` |
| Métodos | Verbo español en PascalCase | `ObtenerTodas()`, `Crear()` |

---

## Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class PeliculasController : ControllerBase
{
    private readonly IPeliculaServicio _servicio;
    public PeliculasController(IPeliculaServicio servicio) => _servicio = servicio;

    [HttpGet]
    public async Task<IActionResult> ObtenerTodas() => Ok(await _servicio.ObtenerTodasAsync());

    [HttpPost]
    public async Task<IActionResult> Crear(CrearPeliculaRequest request) =>
        CreatedAtAction(nameof(ObtenerPorId), new { id = result.Id }, result);
}
```

Códigos HTTP semánticos: `200 Ok`, `201 Created`, `204 NoContent`, `400 BadRequest`, `404 NotFound`.

---

## Services

```csharp
// Interfaz en Services/IPeliculaServicio.cs
public interface IPeliculaServicio
{
    Task<IEnumerable<PeliculaResponse>> ObtenerTodasAsync();
    Task<PeliculaResponse?> ObtenerPorIdAsync(int id);
    Task<PeliculaResponse> CrearAsync(CrearPeliculaRequest request);
}

// Registro en Program.cs
builder.Services.AddScoped<IPeliculaServicio, PeliculaServicio>();
```

- Toda validación de negocio vive en el servicio, nunca en el Controller.
- Lanzar excepciones tipadas o retornar resultados que el Controller mapee a código HTTP.

---

## DTOs

```csharp
public class CrearPeliculaRequest
{
    [Required]
    [MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [Range(1, 300)]
    public int DuracionMinutos { get; set; }
}
```

- Clases POCO sin lógica.
- Data Annotations para validaciones de entrada.
- Nunca exponer entidades del dominio directamente; siempre mapear a DTO de respuesta.
- Mapeo entidad ↔ DTO en el servicio (sin AutoMapper salvo que ya esté en el proyecto).

---

## Manejo de errores

- `404 NotFound` cuando la entidad solicitada no existe.
- `400 BadRequest` con detalle claro cuando la validación falla.
- No exponer detalles internos de excepciones en respuestas de producción.
- `async/await` en todos los métodos que accedan a datos.

---

## Seguridad — contraseñas

El proyecto usa **BCrypt.Net-Next 4.1.0** para el hash de contraseñas. Nunca almacenar ni comparar contraseñas en texto plano.

```csharp
// Hashear al crear o actualizar
string hash = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena);

// Verificar al autenticar
bool valida = BCrypt.Net.BCrypt.Verify(dto.Contrasena, usuario.Contrasena);
```

- Usar siempre estos métodos en el servicio, nunca en el Controller.
- El campo `Usuario.Contrasena` almacena únicamente el hash (60 caracteres, `[MaxLength(60)]`).
