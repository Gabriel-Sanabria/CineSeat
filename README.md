# CineSeat

Software de reservación de asientos de cine.

## Funcionalidades

- Alta y gestión de películas
- Programación de funciones en salas
- Selección y reserva de butacas
- Simulación de pagos
- Dashboard con métricas de ocupación y recaudación

## Stack

| Capa | Tecnología |
|---|---|
| Backend | .NET 10, ASP.NET Core Web API |
| Frontend | Angular 18.2 |
| ORM | Entity Framework Core (code-first) |
| Base de datos | SQL Server |

## Requisitos previos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server)
- Angular CLI: `npm install -g @angular/cli`
- EF Core CLI: `dotnet tool install --global dotnet-ef`

## Inicio rápido

```bash
# Instalar dependencias del cliente
cd cineseat.client && npm install

# Ejecutar la aplicación completa (el backend lanza Angular automáticamente)
dotnet run --project CineSeat.Server
```

La aplicación estará disponible en `https://localhost:54464`.  
La API estará en `https://localhost:7090` con documentación en `/openapi/v1.json`.

## Comandos útiles

```bash
# Solo el cliente Angular
cd cineseat.client && npm start

# Tests del cliente
npm test

# Migraciones EF Core
dotnet ef migrations add <NombreMigracion> --project CineSeat.Server
dotnet ef database update --project CineSeat.Server
```

## Configuración de base de datos

Agregar la cadena de conexión en `CineSeat.Server/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "CineSeat": "Server=localhost;Database=CineSeat;Trusted_Connection=True;"
  }
}
```
