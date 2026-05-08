using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CineSeat.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace CineSeat.Server.Services {

    public class TokenServicio : ITokenServicio {

        private readonly IConfiguration configuracion;

        public TokenServicio(IConfiguration configuracion) {
            this.configuracion = configuracion;
        }

        public string Generar(Usuario usuario) {

            // Leer configuración JWT
            string llave = configuracion["Jwt:Llave"]!;
            string emisor = configuracion["Jwt:Emisor"]!;
            string audiencia = configuracion["Jwt:Audiencia"]!;
            float expiracionHoras = float.Parse(configuracion["Jwt:ExpiracionHoras"]!);

            // Definir los claims del token
            Claim[] claims = [
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()), // Identificador del usuario
                new Claim(JwtRegisteredClaimNames.Email, usuario.Correo) // Correo del usuario
            ];

            // Crear la clave de firma con HMAC SHA-256
            SymmetricSecurityKey claveSeguridad = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(llave));
            SigningCredentials credenciales = new SigningCredentials(claveSeguridad, SecurityAlgorithms.HmacSha256);

            // Construir el descriptor del token
            JwtSecurityToken tokenDescriptor = new JwtSecurityToken(
                issuer: emisor,
                audience: audiencia,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(expiracionHoras),
                signingCredentials: credenciales
            );

			// Retornar el token serializado como string
			return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
