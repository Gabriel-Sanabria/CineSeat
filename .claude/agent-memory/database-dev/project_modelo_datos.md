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
| AsientoReservado | AsientosReservados | (ReservaId, CodigoAsiento) compuesta |
| Pago | Pagos | Id (int) |

## Relaciones configuradas

- `Pelicula` 1→N `Funcion` — FK: `PeliculaId` en `Funcion`
- `Funcion` 1→N `Reserva` — FK: `FuncionId` en `Reserva`
- `Usuario` 1→N `Reserva` — FK: `UsuarioId` en `Reserva`
- `Reserva` 1→N `AsientoReservado` — FK: `ReservaId` en `AsientoReservado` (parte de PK compuesta)
- `Reserva` 1→1 `Pago` — FK: `ReservaId` en `Pago`, índice único `UQ_Pago_ReservaId`

## Índices

- `UQ_Pago_ReservaId` — unique index en `Pago.ReservaId` (garantiza 1 pago por reserva)

## Precisión decimal (Fluent API)

- `Funcion.Precio` → `decimal(8,2)`
- `Pago.Subtotal` → `decimal(8,2)`
- `Pago.CargoServicio` → `decimal(8,2)`
- `Pago.Total` → `decimal(8,2)`

## Decisiones de diseño

- `AsientoReservado` usa PK compuesta `(ReservaId, CodigoAsiento)` — no hay entidad Asiento independiente; el código de asiento es un string libre (ej. "A1") que se valida en capa de negocio.
- `Pago` tiene relación 1-a-1 con `Reserva` configurada con `HasOne/WithOne` en Fluent API porque Data Annotations no puede expresar FK de relación 1-a-1 en EF Core.
- `Portada` en `Pelicula` es `byte[]?` nullable — almacenamiento en columna; candidato futuro a migrar a almacenamiento externo si el tamaño crece.

**Why:** Modelo completo para soportar el flujo reserva → pago de CineSeat.

**How to apply:** Toda migración futura debe partir de este estado. [[project_migraciones]]
