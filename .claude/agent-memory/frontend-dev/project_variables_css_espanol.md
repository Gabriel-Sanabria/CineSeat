---
name: Variables CSS renombradas a español
description: Mapeo completo de custom properties CSS renombradas de inglés a español en 2026-04-30; todas las definiciones y usos actualizados.
type: project
---

Las custom properties del sistema de diseño fueron renombradas a español el 2026-04-30 para cumplir la convención de identificadores en español (CLAUDE.md).

**Mapeo vigente:**

| Nombre anterior | Nombre actual |
|---|---|
| `--bg` | `--fondo` |
| `--surface-1` | `--superficie-1` |
| `--surface-2` | `--superficie-2` |
| `--surface-3` | `--superficie-3` |
| `--gold` | `--dorado` |
| `--gold-light` | `--dorado-claro` |
| `--gold-dim` | `--dorado-tenue` |
| `--cream` | `--crema` |
| `--cream-dim` | `--crema-tenue` |
| `--font-display` | `--fuente-titulo` |
| `--font-body` | `--fuente-cuerpo` |
| `--glow-sm` | `--brillo-sm` |
| `--glow-md` | `--brillo-md` |
| `--pct` | `--porcentaje` |

**Why:** convención de proyecto: todos los identificadores en español sin excepción (CLAUDE.md).

**How to apply:** al agregar nuevas custom properties, usar nombres en español desde el inicio. El binding Angular para la barra de ocupación es `[style.--porcentaje]`, no `[style.--pct]`.
