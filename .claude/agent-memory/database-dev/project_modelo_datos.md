---
name: modelo-datos-cineseat
description: Entidades, relaciones, índices y decisiones de diseño del modelo de datos completo de CineSeat en EF Core.
metadata:
  type: project
---

## Entidades definidas

| Entidad | Tabla | PK |
|---|---|---|
| Usuario | Usuarios | Id (int) |
| Pelicula | Peliculas | Id (int) |
| Funcion | Funciones | Id (int) |
| Reserva | Reservas | Id (int) |
| Asiento | Asientos | (ReservaId, CodigoAsiento) compuesta |
| Pago | Pagos | Id (int) |

## Relaciones configuradas

- `Pelicula` 1→N `Funcion` — FK: `PeliculaId` en `Funcion`
- `Funcion` 1→N `Reserva` — FK: `FuncionId` en `Reserva`
- `Usuario` 1→N `Reserva` — FK: `UsuarioId` en `Reserva`
- `Reserva` 1→N `Asiento` — FK: `ReservaId` en `Asiento` (parte de PK compuesta); navegación `Reserva.Asientos`
- `Reserva` 1→1 `Pago` — FK: `ReservaId` en `Pago`, índice único `UQ_Pago_ReservaId`

## Índices

- `UQ_Pago_ReservaId` — unique index en `Pago.ReservaId` (garantiza 1 pago por reserva)

## Precisión decimal (Fluent API)

- `Funcion.Precio` → `decimal(8,2)`
- `Pago.Subtotal` → `decimal(8,2)`
- `Pago.CargoServicio` → `decimal(8,2)`
- `Pago.Total` → `decimal(8,2)`

## Decisiones de diseño

- `Asiento` (antes `AsientoReservado`) usa PK compuesta `(ReservaId, CodigoAsiento)` — no hay entidad Asiento independiente; el código de asiento es un string libre (ej. "A1") que se valida en capa de negocio.
- `Pago` tiene relación 1-a-1 con `Reserva` configurada con `HasOne/WithOne` en Fluent API porque Data Annotations no puede expresar FK de relación 1-a-1 en EF Core.
- `Portada` en `Pelicula` es `byte[]?` nullable — almacenamiento en columna; candidato futuro a migrar a almacenamiento externo si el tamaño crece.
- EF Core 10 genera Drop+Create al renombrar entidades; corregir manualmente a `RenameTable` + `RenameIndex` para preservar datos. El renombrado de FK constraints con `sp_rename` falla en SQL Server con `@objtype = 'OBJECT'` cuando el objeto FK ya no tiene ese nombre calificado — omitir ese paso es seguro ya que EF no valida nombres de FK en runtime.

**Why:** Modelo completo para soportar el flujo reserva → pago de CineSeat.

**How to apply:** Toda migración futura debe partir de este estado. [[project_migraciones]]
