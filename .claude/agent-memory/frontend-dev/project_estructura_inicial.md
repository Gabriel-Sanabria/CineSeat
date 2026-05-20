---
name: Estructura inicial del cliente Angular
description: Estado del proyecto Angular al inicio — módulos presentes, componentes implementados y convenciones observadas
type: project
---

El scaffolding base del cliente Angular en `cineseat.client/` estaba completamente generado con `ng generate` desde el inicio del proyecto.

**Módulos feature presentes:**
- `autenticacion/` — AutenticacionModule + AutenticacionRoutingModule, LoginComponent, AutenticacionComponent (contenedor sin uso en routing). Renombrado desde `auth/` el 2026-04-28.
- `cartelera/` — CarteleraModule + CarteleraRoutingModule, CarteleraComponent, DetalleComponent, ReservaComponent. ItemFuncionComponent movido a compartido/ el 2026-04-28.
- `peliculas/` — PeliculasModule + PeliculasRoutingModule, PeliculasComponent, CrearComponent. FuncionEditableComponent movido a compartido/ el 2026-04-28.
- `dashboard/` — DashboardModule + DashboardRoutingModule, DashboardComponent
- `compartido/` — CompartidoModule: HeaderComponent (`app-header`), PortadaPeliculaComponent (`app-portada-pelicula`), TarjetaPeliculaComponent (`app-tarjeta-pelicula`), IconoComponent, BuscadorComponent, ItemFuncionComponent (`app-item-funcion`, movido desde cartelera/detalle/ el 2026-04-28), FuncionEditableComponent (`app-funcion-editable`, movido desde peliculas/crear/ el 2026-04-28). Todos exportados. FormsModule importado en CompartidoModule.

**Carpetas de soporte:**
- `src/app/models/` — interfaces TypeScript por dominio (ej: usuario.model.ts)
- `src/app/services/` — servicios HTTP (ej: usuario.service.ts, sin `providedIn: 'root'`)

**Convenciones observadas:**
- `IconoComponent` usa input `nombre` (no `name`) — `[ngSwitch]="nombre"`
- Los servicios se registran en `providers` del módulo correspondiente, no con `providedIn: 'root'`
- `proxy.conf.js` usa array `PROXY_CONFIG` con objetos que tienen array `context`
- `HttpClientModule` ya está en AppModule
- `FormsModule` está en AuthModule, CarteleraModule, PeliculasModule, CompartidoModule — DashboardModule NO lo tiene directamente (hereda `ngModel` vía CompartidoModule)
- Lazy loading en `app-routing.module.ts` para los 4 módulos feature
- Rutas de cartelera: `''` → CarteleraComponent, `':id'` → DetalleComponent, `':id/reserva/:funcionId'` → ReservaComponent

**Estado tras la primera sesión de implementación de UI (2026-04-25):**
- Todos los HTML y CSS implementados para los 7 componentes de pantalla y 6 shared
- Los `.ts` de PeliculasComponent, CrearComponent, DashboardComponent tenían clase vacía — rellenados con stubs y datos mock
- `styles.css` e `index.html` ya tenían variables CSS y fuentes Google configuradas

**Mejoras de calidad CSS aplicadas (2026-04-30):**
- `styles.css :root` tiene `--color-error`, `--color-texto-invertido`, `--color-advertencia` — usar en vez de los hex correspondientes
- `styles.css` tiene clases utilitarias `.icono-sm/md/lg/xl/2xl/3xl` para tamaños FA; no usar `style="font-size:Xpx"` en templates
- `portada-pelicula`: usa `[style.--ancho.px]` y `[style.--alto.px]` en el template; `width/height` vienen de `var(--ancho/--alto, auto)` en el CSS
- `dashboard`: barra de ocupación usa `[style.--pct]="funcion.porcentaje + '%'"` en el template y `width: var(--pct)` en CSS
- `crear.component.css` oculta `input[type="file"]` — el template no tiene style inline en ese input
- Estados `:focus` y `:disabled` añadidos a `.btn`, `.btn-cerrar-sesion`, `.tab-nav`, `.boton-funcion`, `.btn-tipo-sala`, `.btn-eliminar-funcion`

**Why:** El proyecto usa NgModules clásicos; la inyección explícita en providers da control total sobre el scope del servicio.
**How to apply:** Verificar estado actual con find/ls antes de generar nuevos artefactos. Al crear servicios, añadirlos a providers del módulo y agregar ruta al proxy.
