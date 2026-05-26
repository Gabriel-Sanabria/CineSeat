using CineSeat.Server.Data;
using CineSeat.Server.DTOs;
using CineSeat.Server.Mappers;
using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Services {

    public class ReservaServicio : IReservaServicio {

        private readonly AppDBContext contextoBD;

        public ReservaServicio(AppDBContext contextoBD) {
            this.contextoBD = contextoBD;
        }

        public async Task<List<string>> ObtenerAsientosOcupados(int funcionId) {
            // Consultar todos los asientos reservados para la función indicada y retornar sus códigos.
            return await contextoBD.Asientos.Where(a => a.Reserva.FuncionId == funcionId).Select(a => a.CodigoAsiento).ToListAsync();
        }

        public async Task<ReservaDTO> Crear(ReservaCrearDTO dto) {

            // Validar que la función exista en la base de datos.
            bool funcionExiste = await contextoBD.Funciones.AnyAsync(f => f.Id == dto.FuncionId);
            if (!funcionExiste)
                throw new InvalidOperationException("La función especificada no existe.");

            // Validar que el usuario exista en la base de datos.
            bool usuarioExiste = await contextoBD.Usuarios.AnyAsync(u => u.Id == dto.UsuarioId);
            if (!usuarioExiste)
                throw new InvalidOperationException("El usuario especificado no existe.");

            // Validar que ninguno de los asientos solicitados ya esté reservado para esta función.
            List<string> asientosOcupados = await ObtenerAsientosOcupados(dto.FuncionId);
            List<string> asientosEnConflicto = dto.Asientos.Where(a => asientosOcupados.Contains(a)).ToList();
            if (asientosEnConflicto.Count > 0)
                throw new InvalidOperationException($"Los siguientes asientos ya están reservados: {string.Join(", ", asientosEnConflicto)}.");

            // Crear la reserva con su fecha de creación.
            Reserva nuevaReserva = new Reserva {
                FuncionId = dto.FuncionId,
                UsuarioId = dto.UsuarioId,
                FechaCreacion = DateTime.UtcNow,
                // Crear los asientos reservados asociados a partir de los códigos del DTO.
                Asientos = dto.Asientos.Select(codigo => new Asiento {
                    CodigoAsiento = codigo
                }).ToList(),
                // Crear el pago con los montos del DTO.
                Pago = new Pago {
                    Subtotal = dto.Subtotal,
                    CargoServicio = dto.CargoServicio,
                    Total = dto.Total,
                    Fecha = DateTime.UtcNow
                }
            };

            // Guardar la reserva, los asientos y el pago en una sola operación.
            contextoBD.Reservas.Add(nuevaReserva);
            await contextoBD.SaveChangesAsync();

            // Retornar la reserva mapeada a DTO.
            return ReservaMapper.AReservaDTO(nuevaReserva);
        }
    }
}
