using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IUsuarioServicio {

        Task<UsuarioRespuestaDTO> Crear(UsuarioCrearDTO dto);

        Task<bool> Eliminar(int id);

        Task<UsuarioRespuestaDTO?> ValidarCredenciales(UsuarioCrearDTO dto);

        Task<bool> CorreoEnUso(string correo);
    }
}
