using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

	public interface IUsuarioServicio {

		Task<UsuarioDTO> Crear(UsuarioCrearDTO dto);

		Task<UsuarioDTO?> ValidarCredenciales(UsuarioCrearDTO dto);

		void CerrarSesion();
    }
}
