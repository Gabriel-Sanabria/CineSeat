using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

	public interface IUsuarioServicio {

		Task<UsuarioActualDTO> Crear(UsuarioCrearDTO dto);

		Task<UsuarioActualDTO?> ValidarCredenciales(UsuarioCrearDTO dto);

		void CerrarSesion();
    }
}
