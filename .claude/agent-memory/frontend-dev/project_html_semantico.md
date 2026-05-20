---
name: HTML semántico aplicado — CineSeat
description: Estado post-refactor de HTML semántico en todos los componentes principales; qué etiquetas se usaron y dónde quedan pendientes `<div>` justificados.
type: project
---

HTML semántico implementado en sesión 2026-04-30. Todos los componentes principales ya usan etiquetas correctas.

**Contenedores principales `<main>`:**
- `login.component.html` — `.pagina-login`
- `detalle.component.html` — `.pagina-detalle`
- `reserva.component.html` — `.pagina-reserva`
- `cartelera.component.html`, `peliculas.component.html`, `dashboard.component.html` — ya lo tenían

**Encabezados de sección `<header>`:**
- `cartelera.component.html` — `.pagina-cartelera__header`
- `peliculas.component.html` — `.pagina-peliculas__header`
- `dashboard.component.html` — `.pagina-dashboard__header`
- `crear.component.html` — `.crear-topbar`

**Listas `<ul>/<li>`:**
- `detalle.component.html` — `.lista-funciones` (`*ngFor` en el `<li>`)
- `peliculas.component.html` — `.chips-genero` (`*ngFor` en el `<li>`, `<button>` dentro del `<li>`)
- `dashboard.component.html` — `.lista-dashboard` (`*ngFor` en el `<li class="card-dashboard">`)

**Tabla HTML real `<table>`:**
- `dashboard.component.html` — `.tabla-funciones` con `<thead>/<tbody>/<tfoot>` y `<th>/<td>`
- CSS migrado de `display: grid` en filas a `width` por columna en `th/td` con selectores `:nth-child`

**`<div>` que quedan y están justificados:**
- `.detalle-hero`, `.detalle-hero__contenido`, `.detalle-info__badges` — agrupaciones sin rol semántico
- `.boleto` y sus zonas internas en reserva — estructura decorativa de boleto
- `.card-dashboard__header`, `.card-dashboard__info` — agrupaciones internas de tarjeta

**Why:** Mejora accesibilidad, SEO y legibilidad del markup; cumple la skill `frontend-conventions`.
**How to apply:** Al crear nuevos componentes, aplicar el mismo patrón: `<main>` para página, `<header>` para encabezado de sección, `<ul>/<li>` para listas generadas con `*ngFor`, `<table>` para datos tabulares.
