using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

	public interface IUsuarioServicio {

		Task<UsuarioSesionDTO> Crear(UsuarioCrearDTO dto);

		Task<UsuarioSesionDTO?> ValidarCredenciales(UsuarioCrearDTO dto);
    }
}
