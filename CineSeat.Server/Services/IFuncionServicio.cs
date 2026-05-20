using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IFuncionServicio {

        Task<FuncionDTO> Crear(FuncionCrearDTO dto);

        Task<FuncionDTO?> Editar(int id, FuncionCrearDTO dto);

        Task<bool> Eliminar(int id);

        bool FechaEsAnteriorAHoy(DateOnly fecha);

        bool HoraEsAnteriorAHora(DateOnly fecha, string hora);

        bool TipoEsValido(string tipo);
    }
}
