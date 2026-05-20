---
name: Estructura carpeta de documentación
description: Ubicación, convenciones de nombres y archivos existentes en la carpeta docs/ del proyecto CineSeat
type: project
---

La carpeta de documentación del proyecto se encuentra en `E:\Proyectos Visual Studio IDE\CineSeat\docs\`.

Fue creada durante la sesión del 2026-04-30.

Archivos existentes:
- `docs/api-reference.md` — Fuente Markdown de la referencia de API (endpoints, DTOs, códigos de respuesta)
- `docs/api-reference.docx` — Versión Word generada con Pandoc a partir del .md anterior

**Convenciones adoptadas:**
- Nombres en kebab-case y español
- El `.md` es siempre la fuente de verdad; el `.docx` es artefacto generado con Pandoc
- Los `.md` incluyen metadata YAML al inicio (title, date, author) para que Pandoc los use en la portada

**Why:** Las skills `markdown-docs` y `word-docs` establecen esta separación fuente/salida.

**How to apply:** Al crear nueva documentación, siempre crear el `.md` primero bajo `docs/` y luego generar el `.docx` con Pandoc desde la ruta temporal `C:\Users\gabri\AppData\Local\Temp\pandoc\pandoc-3.6.4\pandoc.exe` (descargado manualmente; no está en PATH del sistema).
