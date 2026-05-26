using CineSeat.Server.DTOs;
using CineSeat.Server.Models;

namespace CineSeat.Server.Mappers {

    public static class FuncionMapper {

        private const int CapacidadSala = 100;

        public static FuncionDTO MapearADTO(Funcion funcion) {
			// Mapear la función a un DTO, extrayendo el número de sala del string "Sala X"
			return new FuncionDTO {
                Id = funcion.Id,
                PeliculaId = funcion.PeliculaId,
                Sala = int.Parse(funcion.Sala.Replace("Sala ", "")),
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
