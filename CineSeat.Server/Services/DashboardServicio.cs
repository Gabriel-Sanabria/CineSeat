using CineSeat.Server.Data;
using CineSeat.Server.DTOs;
using CineSeat.Server.Mappers;
using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Services {

    public class DashboardServicio : IDashboardServicio {

        private readonly AppDBContext contextoBD;

        public DashboardServicio(AppDBContext contextoBD) {
            this.contextoBD = contextoBD;
        }

        public async Task<List<DashboardPeliculaDTO>> ObtenerMetricas() {

            // Obtener todas las películas con sus funciones, reservas, asientos y pagos para calcular las métricas reales.
            List<Pelicula> peliculas = await contextoBD.Peliculas.Include(p => p.Funciones).ThenInclude(f => f.Reservas)
            .ThenInclude(r => r.Asientos).Include(p => p.Funciones).ThenInclude(f => f.Reservas).ThenInclude(r => r.Pago)
            .OrderBy(p => p.Titulo)
            .AsNoTracking()
            .ToListAsync();

            // Proyectar cada película a su DTO de dashboard con métricas calculadas desde los datos reales.
            return peliculas.Select(pelicula => {

                // Calcular las métricas de cada función ordenadas por fecha y hora.
                List<DashboardFuncionDTO> funcionesDTO = pelicula.Funciones
                    .OrderBy(f => f.Fecha)
                    .ThenBy(f => f.Hora)
                    .Select(funcion => {

                        // Calcular el total de boletos vendidos como la suma de asientos de todas las reservas de la función.
                        int boletos = funcion.Reservas.Sum(r => r.Asientos.Count);

                        // Calcular el porcentaje de ocupación redondeado en relación a la capacidad fija de la sala.
                        int porcentajeOcupacion = (int)Math.Round((double)boletos * 100 / FuncionMapper.CapacidadSala);

                        // Calcular los ingresos brutos como la suma de los subtotales de los pagos de la función.
                        decimal ingresosBrutos = funcion.Reservas
                            .Where(r => r.Pago != null)
                            .Sum(r => r.Pago!.Subtotal);

                        // Calcular el cargo de servicio como la suma de los cargos de los pagos de la función.
                        decimal cargoServicio = funcion.Reservas
                            .Where(r => r.Pago != null)
                            .Sum(r => r.Pago!.CargoServicio);

                        // Calcular los ingresos totales como la suma de los totales de los pagos de la función.
                        decimal ingresosTotales = funcion.Reservas
                            .Where(r => r.Pago != null)
                            .Sum(r => r.Pago!.Total);

                        return new DashboardFuncionDTO {
                            FuncionId = funcion.Id,
                            Fecha = funcion.Fecha,
                            Hora = funcion.Hora,
                            Sala = FuncionMapper.ExtraerNumeroSala(funcion.Sala),
                            Tipo = funcion.Tipo,
                            Boletos = boletos,
                            PorcentajeOcupacion = porcentajeOcupacion,
                            IngresosBrutos = ingresosBrutos,
                            CargoServicio = cargoServicio,
                            IngresosTotales = ingresosTotales
                        };
                    })
                    .ToList();

                // Calcular los totales de la película como la suma de los valores de todas sus funciones.
                return new DashboardPeliculaDTO {
                    PeliculaId = pelicula.Id,
                    Titulo = pelicula.Titulo,
                    Genero = pelicula.Genero,
                    DuracionHoras = pelicula.DuracionMinutos / 60,
                    DuracionMinutos = pelicula.DuracionMinutos % 60,
                    Funciones = funcionesDTO,
                    TotalBoletos = funcionesDTO.Sum(f => f.Boletos),
                    TotalIngresosBrutos = funcionesDTO.Sum(f => f.IngresosBrutos),
                    TotalCargoServicio = funcionesDTO.Sum(f => f.CargoServicio),
                    TotalIngresosTotales = funcionesDTO.Sum(f => f.IngresosTotales)
                };
            }).ToList();
        }
    }
}
