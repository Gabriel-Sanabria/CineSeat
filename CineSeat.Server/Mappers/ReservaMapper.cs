using CineSeat.Server.DTOs;
using CineSeat.Server.Models;

namespace CineSeat.Server.Mappers {

    public static class ReservaMapper {

        public static ReservaDTO AReservaDTO(Reserva reserva) {
            // Mapear la reserva y sus relaciones a un DTO de respuesta
            return new ReservaDTO {
                Id = reserva.Id,
                FuncionId = reserva.FuncionId,
                UsuarioId = reserva.UsuarioId,
                FechaCreacion = reserva.FechaCreacion,
                Asientos = reserva.Asientos.Select(a => a.CodigoAsiento).ToList(),
                Pago = APagoDTO(reserva.Pago!)
            };
        }

        public static PagoDTO APagoDTO(Pago pago) {
            // Mapear el pago a un DTO de respuesta
            return new PagoDTO {
                Id = pago.Id,
                Subtotal = pago.Subtotal,
                CargoServicio = pago.CargoServicio,
                Total = pago.Total,
                Fecha = pago.Fecha
            };
        }
    }
}
