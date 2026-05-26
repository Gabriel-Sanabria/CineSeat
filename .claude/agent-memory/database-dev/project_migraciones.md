---
name: Migraciones EF Core aplicadas
description: Historial de migraciones EF Core generadas y aplicadas en CineSeat, con entidades cubiertas por cada una.
type: project
---

## Migración: `inicial` (20260501043847_inicial)

**Estado:** Aplicada a SQL Server local (base de datos `CineSeat`).

**Entidades cubiertas:**
- `Usuario` — tabla `Usuarios` con columnas `Id` (int, identity, PK), `Correo` (nvarchar(100), NOT NULL), `Contrasena` (nvarchar(60), NOT NULL).

**DbContext:** `AppDBContext` en `CineSeat.Server/Data/AppDBContext.cs`.

**Why:** Primera migración del proyecto; establece la tabla de autenticación de usuarios.

**How to apply:** Referencia al estado del esquema al inicio del proyecto. Toda migración posterior debe construirse sobre este punto.

---

## Migración: `AgregarModeloCompleto` (20260519215719_AgregarModeloCompleto)

**Estado:** Aplicada a SQL Server local.

**Entidades cubiertas:** Pelicula, Funcion, Reserva, AsientoReservado (nombre original), Pago.

---

## Migración: `RenombrarAsientoReservadoAAsiento` (20260526204210_RenombrarAsientoReservadoAAsiento)

**Estado:** Aplicada a SQL Server local.

**Cambio:** Renombra la tabla `AsientosReservados` a `Asientos` y el índice `PK_AsientosReservados` a `PK_Asientos` usando `RenameTable` / `RenameIndex` — sin pérdida de datos.

**Why:** Renombrado de la entidad `AsientoReservado` a `Asiento` para mayor claridad semántica.

**How to apply:** EF genera Drop+Create al renombrar entidades; siempre corregir manualmente a `RenameTable` + `RenameIndex`. No intentar renombrar FK constraints con `sp_rename @objtype='OBJECT'` — falla en SQL Server y es innecesario para el runtime de EF.
