using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IUsuarioServicio {

		Task<bool> CorreoEnUso(string correo);

		Task<UsuarioRespuestaDTO> Crear(UsuarioCrearDTO dto);

		Task<UsuarioRespuestaDTO?> ValidarCredenciales(UsuarioCrearDTO dto);
    }
}
