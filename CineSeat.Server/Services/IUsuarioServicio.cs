using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IUsuarioServicio {

        Task<UsuarioRespuestaDTO> Crear(UsuarioCrearDTO dto);

        // Retorna null si el usuario no existe
        Task<UsuarioRespuestaDTO?> Actualizar(int id, UsuarioCrearDTO dto);

        // Retorna false si el usuario no existe
        Task<bool> Eliminar(int id);

        // Retorna el DTO del usuario si el correo existe y la contraseña es correcta, o null si no
        Task<UsuarioRespuestaDTO?> ValidarCredenciales(UsuarioCrearDTO dto);

        // Retorna true si ya existe un usuario registrado con ese correo
        Task<bool> CorreoEnUso(string correo);
    }
}
