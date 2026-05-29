# Mapa de API — CineSeat Backend

Este documento describe los endpoints disponibles en la API REST de CineSeat, los DTOs que utilizan y los códigos de respuesta esperados. Está dirigido a desarrolladores que integran o extienden el backend.

---

## 1. Introducción

**URL base (desarrollo)**

| Protocolo | URL |
|---|---|
| HTTPS | `https://localhost:7090/api` |
| HTTP | `http://localhost:5276/api` |

- Todas las peticiones y respuestas usan **JSON** (`Content-Type: application/json`).
- La versión actual de la API no utiliza prefijo de versión en la ruta (`/api/v1`). Los endpoints se acceden directamente bajo `/api`.
- El documento OpenAPI está disponible en desarrollo en `GET /openapi/v1.json`.
- Los endpoints marcados como **requiere autenticación** exigen el atributo `[Authorize]`. La autenticación se gestiona mediante cookie HttpOnly establecida por el endpoint `/api/usuarios/validar`.

---

## 2. Endpoints por controller

### PeliculasController — `/api/peliculas`

| Verbo | Ruta | Descripción | Parámetros de ruta | Body (DTO) | Respuesta exitosa | Requiere auth |
|---|---|---|---|---|---|---|
| `GET` | `/api/peliculas` | Lista todas las películas | — | — | `List<PeliculaDTO>` | Sí |
| `GET` | `/api/peliculas/{id}` | Obtiene una película por ID | `id: int` | — | `PeliculaDTO` | Sí |
| `GET` | `/api/peliculas/{id}/portada` | Devuelve la imagen de portada | `id: int` | — | Archivo binario (MIME variable) | Sí |
| `POST` | `/api/peliculas` | Crea una nueva película con sus funciones | — | `PeliculaCrearDTO` | `PeliculaDTO` (`201 Created`) | Sí |
| `PUT` | `/api/peliculas/{id}` | Edita una película existente y sus funciones | `id: int` | `PeliculaCrearDTO` | `PeliculaDTO` | Sí |
| `DELETE` | `/api/peliculas/{id}` | Elimina una película | `id: int` | — | `204 No Content` | Sí |

### UsuariosController — `/api/usuarios`

| Verbo | Ruta | Descripción | Parámetros de ruta | Body (DTO) | Respuesta exitosa | Requiere auth |
|---|---|---|---|---|---|---|
| `POST` | `/api/usuarios` | Registra un nuevo usuario | — | `UsuarioCrearDTO` | `UsuarioDTO` | No |
| `POST` | `/api/usuarios/validar` | Valida credenciales e inicia sesión | — | `UsuarioCrearDTO` | `UsuarioDTO` | No |
| `POST` | `/api/usuarios/cerrar-sesion` | Cierra la sesión del usuario actual | — | — | `200 OK` | No |

### ReservasController — `/api/reservas`

| Verbo | Ruta | Descripción | Parámetros de ruta | Body (DTO) | Respuesta exitosa | Requiere auth |
|---|---|---|---|---|---|---|
| `GET` | `/api/reservas/funcion/{funcionId}/asientos-ocupados` | Devuelve los códigos de asiento ya ocupados para una función | `funcionId: int` | — | `List<string>` | Sí |
| `POST` | `/api/reservas` | Crea una nueva reserva con su pago asociado | — | `ReservaCrearDTO` | `ReservaDTO` | Sí |

### DashboardController — `/api/dashboard`

| Verbo | Ruta | Descripción | Parámetros de ruta | Body (DTO) | Respuesta exitosa | Requiere auth |
|---|---|---|---|---|---|---|
| `GET` | `/api/dashboard` | Devuelve métricas de ocupación e ingresos agrupadas por película | — | — | `List<DashboardPeliculaDTO>` | Sí |

---

## 3. Detalle de endpoints por recurso

### Películas (`/api/peliculas`)

#### `GET /api/peliculas`

Devuelve la lista completa de películas con sus funciones asociadas.

- **Respuesta exitosa:** `200 OK` — `List<PeliculaDTO>`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `GET /api/peliculas/{id}`

Devuelve el detalle de una película específica por su ID.

- **Respuesta exitosa:** `200 OK` — `PeliculaDTO`
- **No encontrada:** `404 Not Found` — `{ "mensaje": "Película no encontrada" }`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `GET /api/peliculas/{id}/portada`

Devuelve el archivo binario de la imagen de portada de la película. El tipo MIME varía según el formato almacenado (ej.: `image/jpeg`, `image/png`).

- **Respuesta exitosa:** `200 OK` — cuerpo binario de la imagen con el `Content-Type` correspondiente
- **No encontrada:** `404 Not Found` — `{ "mensaje": "Portada no encontrada" }`
- **No autenticado:** `401 Unauthorized`

---

#### `POST /api/peliculas`

Crea una nueva película junto con sus funciones. Requiere autenticación.

- **Respuesta exitosa:** `201 Created` — `PeliculaDTO` con la ruta `Location` apuntando a `GET /api/peliculas/{id}`
- **Error de validación o negocio:** `400 Bad Request` — `{ "mensaje": "<motivo>" }`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `PUT /api/peliculas/{id}`

Edita una película existente y sus funciones. Requiere autenticación.

- **Respuesta exitosa:** `200 OK` — `PeliculaDTO` actualizado
- **No encontrada:** `404 Not Found` — `{ "mensaje": "Película no encontrada" }`
- **Error de validación o negocio:** `400 Bad Request` — `{ "mensaje": "<motivo>" }`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `DELETE /api/peliculas/{id}`

Elimina una película. Requiere autenticación.

- **Respuesta exitosa:** `204 No Content` — sin cuerpo
- **No encontrada:** `404 Not Found` — `{ "mensaje": "Película no encontrada" }`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

### Usuarios (`/api/usuarios`)

#### `POST /api/usuarios`

Registra un nuevo usuario en el sistema.

- **Respuesta exitosa:** `200 OK` — `UsuarioDTO`
- **Error de negocio** (ej.: correo ya registrado): `400 Bad Request` — `{ "mensaje": "<motivo>" }`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `POST /api/usuarios/validar`

Valida las credenciales de un usuario e inicia sesión. Si las credenciales son correctas, el servicio establece una cookie de sesión HttpOnly.

- **Respuesta exitosa:** `200 OK` — `UsuarioDTO`
- **Credenciales inválidas:** `401 Unauthorized` — `{ "mensaje": "Credenciales inválidas" }`
- **Error de negocio:** `400 Bad Request` — `{ "mensaje": "<motivo>" }`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `POST /api/usuarios/cerrar-sesion`

Cierra la sesión del usuario actual. El servicio invalida la cookie de sesión.

- **Respuesta exitosa:** `200 OK` — sin cuerpo relevante

---

### Reservas (`/api/reservas`)

#### `GET /api/reservas/funcion/{funcionId}/asientos-ocupados`

Devuelve la lista de códigos de asiento que ya tienen una reserva activa para la función indicada. El frontend la usa para bloquear visualmente los asientos no disponibles en la pantalla de selección.

- **Parámetros de ruta:** `funcionId` — ID de la `Funcion`
- **Respuesta exitosa:** `200 OK` — `List<string>` con los códigos de asiento ocupados (ej.: `["A1", "A2", "B5"]`)
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

#### `POST /api/reservas`

Crea una nueva `Reserva` para un usuario y una función, registrando los asientos seleccionados y generando el `Pago` correspondiente.

- **Respuesta exitosa:** `200 OK` — `ReservaDTO` con el detalle de la reserva y su pago
- **Error de validación:** `400 Bad Request` — `{ "mensaje": "<motivo>" }`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

### Dashboard (`/api/dashboard`)

#### `GET /api/dashboard`

Devuelve métricas de ocupación e ingresos agrupadas por película. Cada entrada incluye el detalle por función (boletos vendidos, porcentaje de ocupación, ingresos brutos, cargo por servicio e ingresos totales).

- **Respuesta exitosa:** `200 OK` — `List<DashboardPeliculaDTO>`
- **No autenticado:** `401 Unauthorized`
- **Error de servidor:** `500 Internal Server Error` — `{ "mensaje": "Error interno del servidor" }`

---

## 4. DTOs

### PeliculaCrearDTO

DTO de entrada para crear o editar una `Pelicula`. Incluye la lista de funciones asociadas.

| Propiedad | Tipo | Obligatorio | Validaciones |
|---|---|---|---|
| `Titulo` | `string` | Sí | Máximo 200 caracteres |
| `Genero` | `string` | Sí | Máximo 50 caracteres |
| `Clasificacion` | `string` | Sí | Máximo 5 caracteres |
| `Director` | `string` | Sí | Máximo 100 caracteres |
| `Sinopsis` | `string` | Sí | Máximo 1000 caracteres |
| `DuracionHoras` | `int` | Sí | Mínimo 0 |
| `DuracionMinutos` | `int` | Sí | Entre 0 y 59 |
| `Funciones` | `List<FuncionCrearDTO>` | Sí | Al menos 1 elemento |
| `PortadaBase64` | `string?` | No | Imagen codificada en Base64 |
| `MIMEPortada` | `string?` | No | Tipo MIME de la imagen (ej.: `image/jpeg`) |

**Ejemplo de body:**

```json
{
  "titulo": "Origen",
  "genero": "Ciencia Ficción",
  "clasificacion": "PG-13",
  "director": "Christopher Nolan",
  "sinopsis": "Un ladrón que roba secretos corporativos...",
  "duracionHoras": 2,
  "duracionMinutos": 28,
  "funciones": [
    {
      "fecha": "2026-06-01",
      "hora": "20:00",
      "sala": 3,
      "tipo": "2D",
      "precio": 120.00
    }
  ],
  "portadaBase64": "...",
  "mimePortada": "image/jpeg"
}
```

---

### PeliculaDTO

DTO de salida que representa una `Pelicula` con sus funciones. Nunca expone los datos binarios de la portada — en su lugar devuelve la URL para obtenerla.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `int` | Identificador único de la película |
| `Titulo` | `string` | Título de la película |
| `Genero` | `string` | Género cinematográfico |
| `Clasificacion` | `string` | Clasificación de edad |
| `Director` | `string` | Nombre del director |
| `Sinopsis` | `string` | Descripción argumental |
| `DuracionHoras` | `int` | Horas de duración |
| `DuracionMinutos` | `int` | Minutos de duración (0–59) |
| `UrlPortada` | `string` | URL relativa para obtener la portada vía `GET /api/peliculas/{id}/portada` |
| `Funciones` | `List<FuncionDTO>` | Lista de funciones programadas |

---

### FuncionCrearDTO

DTO de entrada para crear o identificar una `Funcion` dentro de una `Pelicula`. El campo `Id` se utiliza al editar una película existente para distinguir funciones que ya existen de las que se agregan nuevas.

| Propiedad | Tipo | Obligatorio | Validaciones |
|---|---|---|---|
| `Id` | `int` | No | Identificador de la función existente. Valor `0` indica función nueva. |
| `Fecha` | `string` | Sí | Formato de fecha (ej.: `"2026-06-01"`) |
| `Hora` | `string` | Sí | Formato de hora (ej.: `"20:00"`) |
| `Sala` | `int` | Sí | Entre 1 y 10 |
| `Tipo` | `string` | Sí | Máximo 10 caracteres (ej.: `"2D"`, `"3D"`, `"IMAX"`) |
| `Precio` | `decimal` | Sí | Mínimo 0 |

---

### FuncionDTO

DTO de salida que representa una `Funcion` asociada a una `Pelicula`.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `int` | Identificador único de la función |
| `PeliculaId` | `int` | ID de la película a la que pertenece |
| `Sala` | `int` | Número de sala |
| `Fecha` | `DateOnly` | Fecha de la función |
| `Hora` | `TimeOnly` | Hora de inicio de la función |
| `Tipo` | `string` | Formato de proyección (ej.: `"2D"`, `"3D"`) |
| `Precio` | `decimal` | Precio de la entrada |
| `AsientosDisponibles` | `int` | Cantidad de asientos sin reserva en el momento de la consulta |

---

### UsuarioCrearDTO

DTO de entrada para registrar un usuario o validar credenciales.

| Propiedad | Tipo | Obligatorio | Validaciones |
|---|---|---|---|
| `Correo` | `string` | Sí | Formato de correo electrónico válido |
| `Contrasena` | `string` | Sí | Mínimo 8 caracteres |
| `SesionMantenida` | `bool` | No | Por defecto `false`. Indica si la sesión debe persistir al cerrar el navegador |

**Ejemplo de body:**

```json
{
  "correo": "usuario@ejemplo.com",
  "contrasena": "miClave123",
  "sesionMantenida": true
}
```

---

### UsuarioDTO

DTO de salida que representa un `Usuario`. Nunca expone la contraseña.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `int` | Identificador único del usuario |
| `Correo` | `string?` | Dirección de correo electrónico |

**Ejemplo de respuesta:**

```json
{
  "id": 42,
  "correo": "usuario@ejemplo.com"
}
```

---

### ReservaCrearDTO

DTO de entrada para crear una `Reserva`. El cliente envía los asientos seleccionados y los montos calculados.

| Propiedad | Tipo | Obligatorio | Validaciones |
|---|---|---|---|
| `FuncionId` | `int` | Sí | — |
| `UsuarioId` | `int` | Sí | — |
| `Asientos` | `List<string>` | Sí | Códigos de asiento (ej.: `["A1", "B3"]`) |
| `Subtotal` | `decimal` | Sí | — |
| `CargoServicio` | `decimal` | Sí | — |
| `Total` | `decimal` | Sí | — |

**Ejemplo de body:**

```json
{
  "funcionId": 5,
  "usuarioId": 42,
  "asientos": ["A1", "A2"],
  "subtotal": 240.00,
  "cargoServicio": 24.00,
  "total": 264.00
}
```

---

### ReservaDTO

DTO de salida que representa una `Reserva` creada. Incluye el `Pago` generado de forma incrustada.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `int` | Identificador único de la reserva |
| `FuncionId` | `int` | ID de la `Funcion` reservada |
| `UsuarioId` | `int` | ID del `Usuario` que realizó la reserva |
| `FechaCreacion` | `DateTime` | Fecha y hora en que se creó la reserva |
| `Asientos` | `List<string>` | Códigos de los asientos reservados |
| `Pago` | `PagoDTO` | Detalle del pago asociado a la reserva |

---

### PagoDTO

DTO de salida incrustado en `ReservaDTO`. Representa el `Pago` generado al crear una reserva.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `int` | Identificador único del pago |
| `Subtotal` | `decimal` | Monto base antes del cargo por servicio |
| `CargoServicio` | `decimal` | Cargo adicional por servicio |
| `Total` | `decimal` | Monto total cobrado |
| `Fecha` | `DateTime` | Fecha y hora del pago |

---

### DashboardPeliculaDTO

DTO de salida que agrupa las métricas de una `Pelicula` para el dashboard. Incluye el detalle por función.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `PeliculaId` | `int` | Identificador de la película |
| `Titulo` | `string` | Título de la película |
| `Genero` | `string` | Género cinematográfico |
| `DuracionHoras` | `int` | Horas de duración |
| `DuracionMinutos` | `int` | Minutos de duración (0–59) |
| `Funciones` | `List<DashboardFuncionDTO>` | Detalle de métricas por función |
| `TotalBoletos` | `int` | Total de boletos vendidos en todas las funciones |
| `TotalIngresosBrutos` | `decimal` | Suma de ingresos brutos (precio × boletos) |
| `TotalCargoServicio` | `decimal` | Suma de cargos por servicio de todas las funciones |
| `TotalIngresosTotales` | `decimal` | Suma de ingresos totales (brutos + cargo servicio) |

---

### DashboardFuncionDTO

DTO de salida incrustado en `DashboardPeliculaDTO`. Representa las métricas de una función individual.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `FuncionId` | `int` | Identificador de la función |
| `Fecha` | `DateOnly` | Fecha de la función |
| `Hora` | `TimeOnly` | Hora de inicio de la función |
| `Sala` | `int` | Número de sala |
| `Tipo` | `string` | Formato de proyección (ej.: `"2D"`, `"3D"`) |
| `Boletos` | `int` | Cantidad de boletos vendidos |
| `PorcentajeOcupacion` | `int` | Porcentaje de ocupación de la sala (0–100) |
| `IngresosBrutos` | `decimal` | Ingresos antes del cargo por servicio |
| `CargoServicio` | `decimal` | Total del cargo por servicio |
| `IngresosTotales` | `decimal` | Ingresos brutos más cargo por servicio |

---

## 5. Códigos de respuesta comunes

| Código | Nombre | Cuándo se devuelve |
|---|---|---|
| `200 OK` | Éxito | La operación se completó correctamente. El body contiene el resultado. |
| `201 Created` | Creado | Un recurso fue creado. Aplica a `POST /api/peliculas`. El header `Location` apunta al nuevo recurso. |
| `204 No Content` | Sin contenido | Operación exitosa sin cuerpo de respuesta. Aplica a `DELETE /api/peliculas/{id}`. |
| `400 Bad Request` | Error de validación o negocio | El modelo no pasa validaciones, o el servicio lanzó `InvalidOperationException`. El body contiene `{ "mensaje": "<motivo>" }`. |
| `401 Unauthorized` | No autenticado | Credenciales inválidas (en `/api/usuarios/validar`) o token de sesión ausente/inválido (en endpoints con `[Authorize]`). |
| `404 Not Found` | No encontrado | El recurso solicitado no existe. El body contiene `{ "mensaje": "<descripción>" }`. |
| `500 Internal Server Error` | Error del servidor | Excepción inesperada no controlada. El body contiene `{ "mensaje": "Error interno del servidor" }`. |
