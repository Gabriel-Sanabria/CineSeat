---
name: mermaid-diagrams
description: Mermaid JS diagram conventions for CineSeat documentation. Use when creating flowcharts, sequence diagrams, ER diagrams or any visual diagram. Ensures compatibility with the VSCode Mermaid Preview extension.
user-invocable: false
disable-model-invocation: false
---

# Convenciones Mermaid JS — CineSeat

## Archivos y ubicación

- Extensión: **`.mmd`** exclusivamente — nunca embeber diagramas en archivos `.md`
- Ubicación: `docs/diagramas/<tipo>/<nombre-en-kebab-case>.mmd`
- Un diagrama por archivo
- Nombres en español y kebab-case: `flujo-reserva.mmd`, `modelo-entidades.mmd`

---

## Compatibilidad con VSCode Mermaid Preview

La extensión **Mermaid Preview** (de Matt Bierner u otras compatibles) renderiza archivos `.mmd` directamente. Reglas para garantizar compatibilidad:

- La primera línea del archivo debe ser el tipo de diagrama sin espacios previos: `flowchart TD`, `sequenceDiagram`, etc.
- Evitar caracteres especiales en etiquetas sin comillas: usar `["texto con espacios"]`
- Acentos y ñ dentro de comillas: `["Función"]`, `["Pelicula"]` — fuera de comillas pueden fallar
- Verificar el diagrama en el preview antes de dar por finalizado

---

## Tipos de diagrama por caso de uso

| Caso | Tipo Mermaid |
|---|---|
| Flujo de proceso o lógica | `flowchart TD` |
| Interacción entre componentes | `sequenceDiagram` |
| Modelo de datos / entidades | `erDiagram` |
| Arquitectura de clases | `classDiagram` |
| Estados de una entidad | `stateDiagram-v2` |
| Línea de tiempo / fases | `gantt` |

---

## Flowchart

Contenido del archivo `flujo-reserva.mmd`:

```
flowchart TD
    A["Usuario selecciona función"] --> B{"¿Asiento disponible?"}
    B -- Sí --> C["Crear reserva"]
    B -- No --> D["Mostrar error"]
    C --> E["Procesar pago"]
    E --> F["Confirmar reserva"]
```

- Dirección: `TD` (top-down) para flujos de proceso, `LR` (left-right) para pipelines
- Nodos: `[texto]` rectangulares, `{texto}` rombos de decisión, `(texto)` redondeados
- Etiquetas en aristas: `-- texto -->`
- IDs de nodos en inglés corto (A, B, C o palabras clave); texto visible en español entre corchetes

---

## Sequence Diagram

Contenido del archivo `interaccion-reserva.mmd`:

```
sequenceDiagram
    actor Usuario
    participant Frontend
    participant API
    participant BD

    Usuario->>Frontend: Selecciona asiento
    Frontend->>API: POST /api/reservas
    API->>BD: Verificar disponibilidad
    BD-->>API: Asiento disponible
    API-->>Frontend: 201 Created
    Frontend-->>Usuario: Confirmación de reserva
```

- `actor` para personas, `participant` para sistemas o componentes
- `->>` llamada síncrona, `-->>` respuesta
- Nombres de participantes en español

---

## ER Diagram

Contenido del archivo `modelo-entidades.mmd`:

```
erDiagram
    PELICULA {
        int Id PK
        string Titulo
        int DuracionMinutos
    }
    FUNCION {
        int Id PK
        int PeliculaId FK
        int SalaId FK
        datetime FechaHora
    }
    PELICULA ||--o{ FUNCION : "tiene"
    SALA ||--o{ FUNCION : "aloja"
```

- Nombres de entidades en MAYÚSCULAS
- Relaciones en español entre comillas: `"tiene"`, `"pertenece a"`
- Cardinalidades: `||--||` uno a uno, `||--o{` uno a muchos, `}o--o{` muchos a muchos

---

## Convenciones generales

- Títulos de diagrama con `---\ntitle: Título en español\n---` al inicio del bloque cuando aplique
- Comentarios con `%%`: `%% Este nodo representa el pago`
- Paleta de colores: solo usar `classDef` si es imprescindible para distinguir grupos
- Mantener los diagramas simples: si supera ~20 nodos, dividir en sub-diagramas
