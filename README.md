# 🎬 CineSeat
**Sistema web de reservación de asientos de cine desarrollado con Angular y .NET**
<br>
<sub>(Proyecto público únicamente con fines de portafolio. <b>NO</b> se autoriza su distribución o comercialización.)</sub>

---

## 🛠️ Tecnologías

- **C#** — Lenguaje de programación del backend
- **ASP.NET Core 10** — Framework Web API
- **Entity Framework Core** — ORM code-first con SQL Server
- **TypeScript** — Lenguaje de programación del frontend
- **Angular 18** — Framework SPA con NgModules
- **SQL Server** — Base de datos relacional

---

## 📖 Sobre el Proyecto

**CineSeat** es una aplicación web para la gestión y reservación de asientos de cine. Permite administrar el catálogo de películas, programar funciones en salas, seleccionar butacas de forma interactiva, simular pagos y consultar métricas operativas desde un panel de control.

La arquitectura sigue un enfoque de **capas separadas**: una API RESTful en .NET como backend y una SPA en Angular como frontend, comunicados a través de HTTP.

---

## ✨ Características Principales

🎥 **Gestión de Películas**
- Alta, edición y eliminación de películas
- Información detallada: título, descripción, género, clasificación

🗓️ **Programación de Funciones**
- Asignación de salas con fecha y hora
- Control de disponibilidad por función

💺 **Reservación de Asientos**
- Visualización interactiva del mapa de butacas
- Selección y reserva de asientos en tiempo real

💳 **Simulación de Pagos**
- Flujo de pago simulado al confirmar una reserva

📊 **Dashboard de Métricas**
- Ocupación por función y sala
- Recaudación por película

---

## 📂 Estructura del Proyecto

```
CineSeat/
├── CineSeat.Server/               # Backend — ASP.NET Core Web API
│   ├── Controllers/               # Endpoints HTTP
│   ├── Services/                  # Lógica de negocio (interfaces + implementaciones)
│   ├── Models/                    # Entidades EF Core
│   ├── DTOs/                      # Contratos de la API (Request / Response)
│   ├── Program.cs                 # Configuración y arranque
│   └── appsettings.json           # Configuración general
│
└── cineseat.client/               # Frontend — Angular 18
    └── src/app/
        ├── core/                  # Servicios singleton, guards, interceptores
        ├── compartido/            # Componentes y pipes reutilizables
        ├── peliculas/             # Módulo de gestión de películas
        ├── funciones/             # Módulo de programación de funciones
        ├── reservas/              # Módulo de reservación de asientos
        ├── pagos/                 # Módulo de simulación de pagos
        └── dashboard/             # Módulo de métricas
```

---

## 🚀 Cómo Ejecutar

### Requisitos Previos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server)
- Angular CLI: `npm install -g @angular/cli`
- EF Core CLI: `dotnet tool install --global dotnet-ef`

### Pasos para Ejecutar

1. Clona este repositorio
2. Configura la cadena de conexión en `CineSeat.Server/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "CineSeat": "Server=localhost;Database=CineSeat;Trusted_Connection=True;"
  }
}
```
3. Aplica las migraciones para crear la base de datos:
```bash
dotnet ef database update --project CineSeat.Server
```
4. Instala las dependencias del cliente:
```bash
cd cineseat.client && npm install
```
5. Ejecuta la aplicación:
```bash
dotnet run --project CineSeat.Server
```

La aplicación estará disponible en `https://localhost:54464`.
