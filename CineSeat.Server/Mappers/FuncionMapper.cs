using CineSeat.Server.DTOs;
using CineSeat.Server.Models;

namespace CineSeat.Server.Mappers {

    public static class FuncionMapper {

        // Capacidad fija de cada sala; compartida con otros servicios que la necesiten
        public const int CapacidadSala = 100;

        // Extrae el número de sala a partir del texto "Sala X"
        public static int ExtraerNumeroSala(string sala) => int.Parse(sala.Replace("Sala ", ""));

        public static FuncionDTO MapearADTO(Funcion funcion) {
			// Mapear la función a un DTO, extrayendo el número de sala del string "Sala X"
			return new FuncionDTO {
                Id = funcion.Id,
                PeliculaId = funcion.PeliculaId,
                Sala = ExtraerNumeroSala(funcion.Sala),
                Fecha = funcion.Fecha,
                Hora = funcion.Hora,
                Tipo = funcion.Tipo,
                Precio = funcion.Precio,
                // Calcular asientos disponibles restando los ocupados de la capacidad total de la sala
                AsientosDisponibles = CapacidadSala - funcion.Reservas.Sum(r => r.Asientos.Count)
            };
        }
    }
}
