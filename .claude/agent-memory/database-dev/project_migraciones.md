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
