using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CineSeat.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace CineSeat.Server.Services {

    public class TokenServicio : ITokenServicio {

        private readonly IConfiguration configuracion;
        private readonly IHttpContextAccessor httpContextAccessor;

        public TokenServicio(IConfiguration configuracion, IHttpContextAccessor httpContextAccessor) {
            this.configuracion = configuracion;
            this.httpContextAccessor = httpContextAccessor;
        }

        public void GenerarComoCookie(Usuario usuario, bool sesionMantenida = false) {

            // Leer configuración JWT
            string llave = configuracion["Jwt:Llave"]!;
            string emisor = configuracion["Jwt:Emisor"]!;
            string audiencia = configuracion["Jwt:Audiencia"]!;
            float expiracionHoras = sesionMantenida ? float.Parse(configuracion["Jwt:ExpiracionHorasExtendida"]!) : float.Parse(configuracion["Jwt:ExpiracionHoras"]!);

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

            // Serializar el token a string
            string token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

            // Configurar las opciones de la cookie HttpOnly
            var opciones = new CookieOptions {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Path = "/"
            };
            if (sesionMantenida) opciones.Expires = DateTimeOffset.UtcNow.AddDays(7);

            // Escribir el token como cookie HttpOnly para protegerlo
            httpContextAccessor.HttpContext!.Response.Cookies.Append("cineseat_token", token, opciones);
        }

        public void EliminarCookie() {
			// Eliminar la cookie del token en el navegador para cerrar la sesión del usuario
			httpContextAccessor.HttpContext!.Response.Cookies.Delete("cineseat_token");
        }
    }
}
