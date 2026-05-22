using CineSeat.Server.Data;
using CineSeat.Server.DTOs;
using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Services {

    public class UsuarioServicio : IUsuarioServicio {

        private readonly AppDBContext contextoBD;
        private readonly ITokenServicio tokenServicio;

		public UsuarioServicio(AppDBContext contextoBD, ITokenServicio tokenServicio) {
			this.contextoBD = contextoBD;
			this.tokenServicio = tokenServicio;
		}

		public async Task<UsuarioDTO> Crear(UsuarioCrearDTO dto) {

			// Validar que el correo no esté en uso
			bool correoEnUso = await CorreoEnUso(dto.Correo);
			if (correoEnUso) {
				throw new InvalidOperationException($"El correo {dto.Correo} ya está registrado.");
			}

			// Hashear la contraseña usando BCrypt
			string contrasenaHasheada = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena, workFactor: 10);

			// Crear una nueva instancia de usuario con los datos del DTO y la contraseña hasheada
			Usuario nuevoUsuario = new Usuario {
				Correo = dto.Correo,
				Contrasena = contrasenaHasheada
			};

			// Agregar el nuevo usuario al registro de usuarios y guardar los cambios en la base de datos
			contextoBD.Usuarios.Add(nuevoUsuario);
			await contextoBD.SaveChangesAsync();

			// Generar token JWT para que el nuevo usuario pueda iniciar sesión inmediatamente
			tokenServicio.GenerarComoCookie(nuevoUsuario, dto.SesionMantenida);

			// Retornar el DTO con la información del usuario creado
			return new UsuarioDTO {
				Id = nuevoUsuario.Id,
				Correo = nuevoUsuario.Correo
			};
		}

		public async Task<UsuarioDTO?> ValidarCredenciales(UsuarioCrearDTO dto) {

			// Buscar el usuario por correo
			Usuario? usuarioEncontrado = await contextoBD.Usuarios.FirstOrDefaultAsync(u => u.Correo.ToLower() == dto.Correo.ToLower());

			// Si no se encontró el usuario, retornar null
			if (usuarioEncontrado == null) return null;

			// Verificar la contraseña usando el método de BCrypt
			if (!BCrypt.Net.BCrypt.Verify(dto.Contrasena, usuarioEncontrado.Contrasena)) return null;

			// Si la verificación fue exitosa, generar el token JWT para el usuario autenticado como cookie del navegador
			tokenServicio.GenerarComoCookie(usuarioEncontrado, dto.SesionMantenida);

			// Retornar el DTO con los datos básicos del usuario autenticado
			return new UsuarioDTO {
				Id = usuarioEncontrado.Id,
				Correo = usuarioEncontrado.Correo
			};
		}

		public void CerrarSesion() {
			// Delegar la eliminación de la cookie al servicio de token
			tokenServicio.EliminarCookie();
		}

		// --------- MÉTODOS AUXILIARES ---------
		private async Task<bool> CorreoEnUso(string correo) {
			// Retornar true si un correo dado no es null y ya esta siendo usado por otro usuario en la base de datos (ignorando mayúsculas).
			return await contextoBD.Usuarios.AnyAsync(u => u.Correo != null && u.Correo.ToLower() == correo.ToLower());
		}
    }
}
