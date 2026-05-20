---
name: word-docs
description: Word document (.docx) generation conventions for CineSeat using Pandoc. Use when documentation needs to be delivered as a Word file, converting from Markdown source.
user-invocable: false
disable-model-invocation: false
---

# Convenciones Documentos Word — CineSeat

## Enfoque: Markdown como fuente, Word como salida

Los documentos Word se generan a partir de archivos `.md` usando **Pandoc**. Nunca redactar contenido directamente en Word; el `.md` es la fuente de verdad.

```
docs/<sección>/nombre-documento.md   ← fuente editable
docs/exportados/nombre-documento.docx ← salida generada
```

---

## Conversión con Pandoc

### Conversión básica

```bash
pandoc docs/arquitectura/arquitectura-general.md -o docs/exportados/arquitectura-general.docx
```

### Con plantilla de referencia (recomendado)

```bash
pandoc docs/flujos/flujo-reserva.md \
  --reference-doc=docs/plantillas/plantilla-cineseat.docx \
  -o docs/exportados/flujo-reserva.docx
```

### Generar plantilla base editable

```bash
pandoc --print-default-data-file reference.docx > docs/plantillas/plantilla-cineseat.docx
```

Editar la plantilla en Word para ajustar fuentes, colores y márgenes. Pandoc respeta los estilos definidos en ella.

---

## Instalación de Pandoc

```bash
# Windows (winget)
winget install JohnMacFarlane.Pandoc

# Verificar instalación
pandoc --version
```

---

## Mapeo de estilos Markdown → Word

| Markdown | Estilo Word aplicado |
|---|---|
| `# Título` | Heading 1 |
| `## Sección` | Heading 2 |
| `### Subsección` | Heading 3 |
| Párrafo normal | Normal / Body Text |
| ` ```código``` ` | Source Code |
| `**negrita**` | Bold |
| Tabla | Table |

Los nombres de estilo corresponden a los de la plantilla de referencia. Renombrar en Word si se usan nombres en español.

---

## Contenido recomendado para documentos Word

Los `.docx` se usan para entregables formales o documentación para stakeholders no técnicos. Incluir:

1. **Portada**: título, fecha, versión, autor
2. **Índice**: generado automáticamente por Pandoc si el documento tiene `## Secciones`
3. **Cuerpo**: contenido del `.md` fuente
4. **Anexos**: diagramas exportados como imagen si Mermaid no renderiza en Word

### Exportar diagramas Mermaid como imagen para Word

```bash
# Requiere @mermaid-js/mermaid-cli (mmdc)
npx mmdc -i docs/diagramas/flujo-reserva.md -o docs/exportados/flujo-reserva.png
```

Luego referenciar la imagen en el `.md` fuente:

```markdown
![Flujo de reserva](../exportados/flujo-reserva.png)
```

---

## Convenciones del archivo .md fuente para Word

- Incluir metadata YAML al inicio del `.md` para que Pandoc la use en la portada:

```markdown
---
title: "Arquitectura General — CineSeat"
date: "2026-04-29"
author: "Equipo CineSeat"
---
```

- Los bloques de código se preservan como texto con estilo monoespaciado
- Las tablas Markdown se convierten en tablas Word estilizadas
- Los links relativos entre `.md` no se resuelven en `.docx`; usar texto plano para referencias cruzadas
