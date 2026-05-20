---
name: Estructura y convenciones de documentación CineSeat
description: Ubicación real de la carpeta de documentación, archivos existentes y convenciones aplicadas en el proyecto.
type: project
---

La carpeta de documentación real del proyecto es `Documentacion/` en la raíz (no `docs/`). La skill markdown-docs indica `docs/` pero el proyecto usa `Documentacion/`.

Archivos existentes en `Documentacion/`:
- `componentes.mmd` — diagrama Mermaid de componentes
- `mapa-api.md` — referencia de endpoints de la API
- `autenticacion-jwt.md` — documentación completa del sistema JWT (creado 2026-05-08)
- `modelo-datos.md` — diagrama erDiagram del modelo de base de datos (creado 2026-05-19)

**Why:** El orquestador instruyó explícitamente que toda documentación va en `Documentacion/`. La skill markdown-docs tiene una ruta desactualizada.

**How to apply:** Siempre usar `Documentacion/` como raíz de documentación, ignorar la ruta `docs/` que indica la skill.
