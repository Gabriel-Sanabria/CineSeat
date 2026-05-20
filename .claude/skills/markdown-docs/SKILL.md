---
name: markdown-docs
description: Markdown documentation conventions for CineSeat. Use when creating or updating any .md documentation file, including architecture overviews, flow descriptions, API references or onboarding guides.
user-invocable: false
disable-model-invocation: false
---

# Convenciones Markdown — CineSeat

## Archivos y ubicación

- Extensión: `.md`
- Ubicación raíz de documentación: `docs/`
- Estructura sugerida:
  ```
  docs/
  ├── arquitectura/     → visión general, decisiones técnicas
  ├── diagramas/        → archivos Mermaid
  ├── flujos/           → descripción de flujos de negocio
  └── api/              → referencia de endpoints
  ```
- Nombres en kebab-case y español: `flujo-reserva.md`, `arquitectura-general.md`
- Un tema principal por archivo

---

## Estructura de un documento

```markdown
# Título del documento

Párrafo de introducción breve: qué es esto y para quién es útil.

---

## Sección principal

Contenido...

### Subsección

Contenido...

---

## Referencias

- [Nombre](ruta-relativa.md)
```

- `#` solo para el título del documento (uno por archivo)
- `##` para secciones principales
- `###` para subsecciones; evitar `####` o más profundo
- `---` como separador visual entre secciones de nivel `##`

---

## Texto y formato

- **Negrita** para términos clave, nombres de entidades o valores importantes
- `código inline` para nombres de clases, métodos, rutas, comandos y valores literales
- _Cursiva_ con moderación, solo para énfasis semántico real
- Sin HTML embebido en los documentos Markdown

---

## Listas

Usar listas de viñetas (`-`) para elementos sin orden relevante; numeradas (`1.`) solo cuando el orden importa.

```markdown
- Elemento A
- Elemento B
  - Sub-elemento (máximo un nivel de anidación)

1. Primero instalar dependencias
2. Ejecutar migraciones
3. Iniciar el servidor
```

---

## Tablas

```markdown
| Columna A | Columna B | Columna C |
|---|---|---|
| Valor 1   | Valor 2   | Valor 3   |
```

- Encabezados en negrita implícita (la sintaxis los resalta solos)
- Alinear con espacios solo si mejora la legibilidad en el editor
- Para tablas complejas, preferir listas descriptivas

---

## Bloques de código

Siempre especificar el lenguaje para syntax highlighting:

````markdown
```csharp
public class Pelicula { }
```

```typescript
const servicio = inject(PeliculasService);
```

```bash
dotnet ef migrations add NombreMigracion
```

```json
{ "ConnectionStrings": { "CineSeat": "..." } }
```
````

---

## Diagramas

Incluir diagramas Mermaid directamente en el documento con bloque ` ```mermaid `.  
Ver skill `mermaid-diagrams` para sintaxis y convenciones de diagramas.

---

## Idioma y redacción

- Todo el contenido en **español**
- Usar los nombres de entidades exactamente como aparecen en el código: `Pelicula`, `Funcion`, `CineContext`
- Voz activa y frases cortas: preferir "El servicio valida el pago" sobre "La validación del pago es realizada por el servicio"
- Evitar redundancias: un concepto se explica una vez y se referencia después
