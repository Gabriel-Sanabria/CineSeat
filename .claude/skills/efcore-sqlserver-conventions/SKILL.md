---
name: efcore-sqlserver-conventions
description: Entity Framework Core and SQL Server conventions for CineSeat. Code-first approach, entity design, normalization rules, DbContext configuration, migrations and query optimization. Use when working with database entities, migrations or data access.
user-invocable: false
disable-model-invocation: false
---

# Convenciones EF Core + SQL Server — CineSeat

## Enfoque: code-first obligatorio

Las entidades C# son la única fuente de verdad del esquema. Prohibido el enfoque database-first (`dotnet ef dbcontext scaffold` o equivalentes). Nunca editar la base de datos directamente.

---

## Naming (todo en español)

| Elemento | Patrón | Ejemplo |
|---|---|---|
| Tabla / Entidad | Singular PascalCase | `Pelicula`, `Sala`, `Funcion` |
| Columna | PascalCase | `FechaCreacion`, `PrecioBase` |
| FK | `{Entidad}Id` | `PeliculaId`, `SalaId` |
| Índice | `IX_{Tabla}_{Columna}` | `IX_Funcion_FechaHora` |
| Unique constraint | `UQ_{Tabla}_{Columna}` | `UQ_Usuario_Email` |

---

## Diseño de entidades

```csharp
public class Pelicula
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [Comment("Duración en minutos")]
    public int DuracionMinutos { get; set; }

    public decimal PrecioBase { get; set; }          // decimal(18,2) — nunca float/double para dinero

    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    public DateTime FechaModificacion { get; set; }

    public ICollection<Funcion> Funciones { get; set; } = [];
}
```

- `[Required]` y `[MaxLength(n)]` para restricciones simples.
- `[Comment("...")]` en propiedades cuyo propósito no sea obvio.
- `FechaCreacion` y `FechaModificacion` en todas las entidades principales.
- Claves primarias: `int` o `Guid`. Nunca claves naturales mutables.
- Propiedades de navegación `virtual` solo si se justifica lazy loading; preferir `Include` explícito.

---

## Normalización

Aplicar mínimo **3FN**; evaluar **FNBC** y **4FN** ante dependencias multivaluadas.

- Eliminar dependencias parciales y transitivas.
- Relaciones M:N con atributos propios → tabla de unión explícita (ej. `Reserva` entre `Funcion` y `Usuario`).
- Nunca duplicar datos que puedan derivarse de otra tabla.

---

## DbContext (CineContext)

```csharp
// Program.cs
builder.Services.AddDbContext<CineContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("CineSeat"),
        opts => opts.MigrationsHistoryTable("__EFMigrationsHistory")
    ));
```

- Un único `DbContext` (`CineContext`) por aplicación.
- Cadena de conexión en `appsettings.Development.json` bajo `ConnectionStrings:CineSeat`.
- Fluent API en `OnModelCreating` para relaciones, índices y restricciones complejas.
- No usar `DbContext` fuera del ciclo de vida de la solicitud HTTP.

---

## Migraciones

```bash
dotnet ef migrations add <NombreMigracion> --project CineSeat.Server
dotnet ef database update --project CineSeat.Server
```

- Nombres descriptivos en español: `AgregarTablaReserva`, `AgregarIndiceEmailUsuario`.
- Revisar el código generado de la migración antes de aplicarla.
- Datos semilla: `modelBuilder.Entity<T>().HasData(...)` en migraciones dedicadas.

---

## Consultas y rendimiento

- `.AsNoTracking()` en consultas de solo lectura.
- Proyecciones con `Select` cuando no se va a modificar la entidad.
- Cargar relaciones con `.Include().ThenInclude()` para evitar N+1.
- Índices en columnas usadas frecuentemente en `WHERE`, `JOIN` u `ORDER BY`.
- Operaciones masivas: `ExecuteUpdateAsync()` / `ExecuteDeleteAsync()` (EF Core 7+).
