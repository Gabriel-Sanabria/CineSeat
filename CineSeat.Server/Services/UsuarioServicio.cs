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

		public async Task<UsuarioSesionDTO> Crear(UsuarioCrearDTO dto) {

			// Validar que el correo no esté en uso
			bool correoEnUso = await CorreoEnUso(dto.Correo);
			if (correoEnUso) {
				throw new InvalidOperationException($"El correo {dto.Correo} ya está registrado.");
			}

			// Hashear la contraseña usando BCrypt
			string contrasenaHasheada = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena);

			// Crear una nueva instancia de usuario con los datos del DTO y la contraseña hasheada
			Usuario nuevoUsuario = new Usuario {
				Correo = dto.Correo,
				Contrasena = contrasenaHasheada
			};

			// Agregar el nuevo usuario al registro de usuarios y guardar los cambios en la base de datos
			contextoBD.Usuarios.Add(nuevoUsuario);
			await contextoBD.SaveChangesAsync();

			// Retornar el DTO con la información del usuario creado y el token generado
			return new UsuarioSesionDTO {
				Id = nuevoUsuario.Id,
				Correo = nuevoUsuario.Correo,
				Token = tokenServicio.Generar(nuevoUsuario)
			};
		}

		public async Task<UsuarioSesionDTO?> ValidarCredenciales(UsuarioCrearDTO dto) {

			// Validar que exista un usuario con el correo especificado
			if(!await CorreoEnUso(dto.Correo)) return null;

			// Buscar el usuario por correo
			Usuario? usuarioEncontrado = await contextoBD.Usuarios.FirstOrDefaultAsync(u => u.Correo.ToLower() == dto.Correo.ToLower());

			// Si se encontró el usuario:
			if (usuarioEncontrado != null) {

				// Verificar la contraseña usando el método de BCrypt
				if (!BCrypt.Net.BCrypt.Verify(dto.Contrasena, usuarioEncontrado.Contrasena)) return null;

				// Generar el token JWT para el usuario autenticado
				string token = tokenServicio.Generar(usuarioEncontrado);

				// Retornar el DTO de sesión con el token y los datos básicos del usuario
				return new UsuarioSesionDTO {
					Token = token,
					Id = usuarioEncontrado.Id,
					Correo = usuarioEncontrado.Correo
				};
			}

			// Si no se encontró el usuario, retornar null
			return null;
		}

		// --------- MÉTODOS AUXILIARES ---------
		private async Task<bool> CorreoEnUso(string correo) {
			// Retornar true si un correo dado no es null y ya esta siendo usado por otro usuario en la base de datos (ignorando mayúsculas).
			return await contextoBD.Usuarios.AnyAsync(u => u.Correo != null && u.Correo.ToLower() == correo.ToLower());
		}
    }
}
