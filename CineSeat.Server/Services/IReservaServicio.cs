using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IReservaServicio {

        Task<List<string>> ObtenerAsientosOcupados(int funcionId);

        Task<ReservaDTO> Crear(ReservaCrearDTO dto);
    }
}
