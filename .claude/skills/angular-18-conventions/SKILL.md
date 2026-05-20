---
name: angular-18-conventions
description: Angular 18 conventions, patterns and technical guidelines for CineSeat frontend. Use when implementing components, modules, services, guards, forms or any Angular feature.
user-invocable: false
disable-model-invocation: false
---

# Convenciones Angular 18 — CineSeat

## Scaffolding (siempre con CLI)

```bash
ng generate module <nombre> --route <ruta> --module app   # feature module con lazy-loading
ng generate component <ruta/nombre>
ng generate service core/<nombre>
ng generate guard core/<nombre>
ng generate pipe compartido/<nombre>
ng generate directive compartido/<nombre>
```

Nunca crear archivos Angular manualmente. El flag `--standalone` está deshabilitado globalmente en `angular.json`.

---

## Estructura de módulos

```
cineseat.client/src/app/
├── core/           → Servicios singleton, guards, interceptores HTTP
├── compartido/     → Componentes, pipes y directivas reutilizables (usados en 2+ feature modules)
└── <feature>/      → peliculas | funciones | reservas | pagos | dashboard
```

`compartido/` solo exporta lo que realmente se reutiliza. Sin lógica de negocio.

---

## Componentes

**Cuándo dividir:**
- Template o lógica supera ~200 líneas
- Un bloque visual se repite en 2+ lugares
- Una sección tiene responsabilidad claramente diferenciada

**Cuándo no dividir:**
- El componente es simple y autocontenido
- La división solo añade archivos sin aportar reutilización real

**Comunicación:**
- Padre → Hijo: `@Input()`
- Hijo → Padre: `@Output()` + `EventEmitter`
- Componentes no relacionados: servicio con `Subject`/`BehaviorSubject` en `core/`
- Evitar prop drilling de más de 1 nivel; en ese caso, usar servicio.

---

## Servicios HTTP

- Un servicio por dominio: `PeliculasService`, `FuncionesService`, `ReservasService`.
- Los componentes nunca llaman `HttpClient` directamente; siempre a través del servicio.
- Usar `Observable` y `async` pipe cuando sea posible; si no, desuscribirse en `ngOnDestroy`.
- Todo nuevo endpoint del API debe agregarse al arreglo `context` de `cineseat.client/src/proxy.conf.js`.

---

## Formularios (Template-Driven Forms)

```html
<input name="titulo" [(ngModel)]="pelicula.titulo" required #titulo="ngModel">
<span *ngIf="titulo.invalid && titulo.touched">Campo requerido</span>
```

- Validaciones HTML5 + directivas Angular (`required`, `minlength`, `maxlength`, `pattern`).
- Mostrar mensajes solo cuando `control.invalid && control.touched`.
- El cliente valida para UX; el API siempre revalida. No confiar solo en el cliente.

---

## Plantillas

- Directivas clásicas: `*ngIf`, `*ngFor`, `*ngSwitch`. Prohibido el control-flow `@if/@for`.
- Sin lógica compleja en el template; moverla al componente (`.ts`).
- Nombres de componentes descriptivos en español: `lista-peliculas`, `formulario-reserva`, `tarjeta-funcion`.
