---
name: frontend-conventions
description: HTML and CSS conventions for CineSeat Angular views. Use when implementing templates, component styles, responsive design or semantic markup.
user-invocable: false
disable-model-invocation: false
---

# Convenciones HTML y CSS — CineSeat

## HTML — Etiquetas Semánticas

Siempre usar el elemento semántico correcto. `<div>` y `<span>` solo para agrupaciones sin significado estructural.

| Zona | Etiqueta obligatoria |
|---|---|
| Encabezado de página o sección | `<header>` |
| Navegación | `<nav>` |
| Contenido principal | `<main>` |
| Sección temática con título | `<section>` |
| Contenido autónomo | `<article>` |
| Contenido lateral | `<aside>` |
| Pie de página o sección | `<footer>` |
| Grupo de campos de formulario | `<fieldset>` + `<legend>` |
| Listas de elementos | `<ul>` / `<ol>` + `<li>` |

**Incorrecto:**
```html
<div class="encabezado">
  <div class="nav">
    <div class="enlace">Inicio</div>
  </div>
</div>
```

**Correcto:**
```html
<header class="encabezado">
  <nav class="navegacion">
    <a routerLink="/">Inicio</a>
  </nav>
</header>
```

---

## HTML — Sin Estilos Embebidos

**Nunca** usar `style=""` inline, `[style]` ni `[ngStyle]` en los templates. Todo estilo vive en el archivo `.css` del componente.

**Prohibido:**
```html
<div style="color: red; padding: 1rem;">Error</div>
<p [style.fontSize]="tamaño">Texto</p>
<div [ngStyle]="{'background': color}">Fondo</div>
```

**Correcto — clases BEM con modificadores:**
```html
<div class="mensaje mensaje--error">Error</div>
<div [ngClass]="{'mensaje--error': esError, 'mensaje--exito': esExito}" class="mensaje">
  Contenido
</div>
```

---

## CSS — Un Archivo por Componente

Cada componente Angular tiene su propio archivo `.css`. Los estilos de un componente **no van en** `styles.css` global.

```
src/app/peliculas/
├── lista-peliculas/
│   ├── lista-peliculas.component.ts
│   ├── lista-peliculas.component.html
│   └── lista-peliculas.component.css    ← estilos propios del componente
```

`styles.css` solo contiene variables globales, reset y estilos de elementos base (`body`, `h1-h6`, `a`, `input`).

---

## CSS — Nomenclatura BEM en Español

**Patrón:** `bloque__elemento--modificador`

- **Bloque**: componente visual independiente (`tarjeta-pelicula`)
- **Elemento**: parte interna del bloque, separado con `__` (`tarjeta-pelicula__titulo`)
- **Modificador**: variante o estado, separado con `--` (`tarjeta-pelicula--destacada`)

Todos los nombres en **español**, **kebab-case**, **sin camelCase ni siglas en mayúsculas**.

```css
/* Bloque */
.tarjeta-pelicula {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: var(--sombra-mediana);
}

/* Elementos */
.tarjeta-pelicula__imagen {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.25rem;
}

.tarjeta-pelicula__titulo {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Modificador de bloque */
.tarjeta-pelicula--destacada {
  border: 2px solid var(--color-primario);
}

/* Modificador de elemento */
.tarjeta-pelicula__boton--deshabilitado {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```html
<article class="tarjeta-pelicula tarjeta-pelicula--destacada">
  <img class="tarjeta-pelicula__imagen" src="..." alt="Póster">
  <h3 class="tarjeta-pelicula__titulo">Título</h3>
  <button class="tarjeta-pelicula__boton tarjeta-pelicula__boton--deshabilitado">
    Ver función
  </button>
</article>
```

---

## CSS — Variables Globales

Definir en `styles.css`, consumir en todos los componentes.

```css
:root {
  --color-primario: #2563eb;
  --color-primario-oscuro: #1e40af;
  --color-secundario: #64748b;
  --color-exito: #10b981;
  --color-error: #ef4444;
  --color-advertencia: #f59e0b;
  --color-fondo: #f8fafc;
  --color-texto: #1e293b;
  --color-borde: #e2e8f0;

  --fuente-principal: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  --sombra-pequeña: 0 1px 2px rgba(0, 0, 0, 0.05);
  --sombra-mediana: 0 4px 6px rgba(0, 0, 0, 0.1);
  --sombra-grande: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## CSS — Responsividad (Desktop-First con soporte móvil)

CineSeat es una aplicación de escritorio. Los estilos base apuntan a **desktop**; las media queries reducen el layout hacia pantallas más pequeñas.

### Breakpoints estándar

```css
/* Desktop (base, sin media query): 1024px+ */

/* Tablet */
@media (max-width: 1023px) { }

/* Móvil grande */
@media (max-width: 767px) { }

/* Móvil pequeño */
@media (max-width: 479px) { }
```

### Ejemplo práctico

```css
/* Desktop: tres columnas (base) */
.lista-funciones {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
}

/* Tablet: dos columnas */
@media (max-width: 1023px) {
  .lista-funciones {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.5rem;
  }
}

/* Móvil: columna única */
@media (max-width: 767px) {
  .lista-funciones {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}
```

### Reglas de responsividad

- Usar `rem` para tamaños de fuente y espaciados; `%` o `fr` para anchos proporcionales
- Imágenes: `max-width: 100%` siempre; usar `object-fit: cover` en contenedores fijos
- Evitar `px` fijos en anchos; preferir `max-width` + `width: 100%`
- Probar siempre en 1280px (desktop referencia), 768px (tablet) y 375px (móvil)

---

## Estados Interactivos

Definir todos los estados en cada elemento interactivo.

```css
.boton-primario {
  background-color: var(--color-primario);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.boton-primario:hover {
  background-color: var(--color-primario-oscuro);
  transform: translateY(-1px);
}

.boton-primario:focus {
  outline: 2px solid var(--color-primario);
  outline-offset: 2px;
}

.boton-primario:active {
  transform: translateY(0);
}

.boton-primario:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## Checklist de Revisión

- [ ] HTML semántico: no `<div>` donde corresponde `<header>`, `<nav>`, `<main>`, etc.
- [ ] Sin `style=""` inline ni `[ngStyle]` en el template
- [ ] Archivo `.css` separado por componente; `styles.css` solo para globals
- [ ] Clases con BEM (`bloque__elemento--modificador`) en español
- [ ] Variables CSS globales usadas para colores y sombras
- [ ] Estilos base para desktop; media queries reducen hacia tablet y móvil
- [ ] `max-width: 100%` en imágenes; sin anchos fijos en contenedores
- [ ] Estados `:hover`, `:focus`, `:active` y `:disabled` definidos
- [ ] `<label>` asociado a cada `<input>`; `alt` en todas las imágenes
