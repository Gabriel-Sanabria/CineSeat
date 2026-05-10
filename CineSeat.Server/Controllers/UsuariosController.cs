using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase {

        private readonly IUsuarioServicio servicioUsuarios;

        public UsuariosController(IUsuarioServicio servicioUsuarios) {
            this.servicioUsuarios = servicioUsuarios;
        }

        // POST api/usuarios
        [HttpPost]
        public async Task<ActionResult<UsuarioActualDTO>> Crear([FromBody] UsuarioCrearDTO dto) {
            try {
                // Intentar crear el usuario llamando al metodo del servicio.
                UsuarioActualDTO resultado = await servicioUsuarios.Crear(dto);
                return Ok(resultado);
            }
            catch (InvalidOperationException ex) {
                // Si ocurre un error de negocio, retornar una respuesta 400 Bad Request con el mensaje.
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // POST api/usuarios/validar
        [HttpPost("validar")]
        public async Task<ActionResult<UsuarioActualDTO>> ValidarCredenciales([FromBody] UsuarioCrearDTO dto) {
            try {
                // Intentar validar las credenciales del usuario llamando al metodo del servicio.
                UsuarioActualDTO? resultado = await servicioUsuarios.ValidarCredenciales(dto);

                // Si el usuario no es encontrado, retornar una respuesta 401 Unauthorized con un mensaje.
                if (resultado == null) {
                    return Unauthorized(new { mensaje = "Credenciales inválidas" });
                }

                return Ok(resultado);
            }
            catch (InvalidOperationException ex) {
                // Si ocurre un error de negocio, retornar una respuesta 400 Bad Request con el mensaje.
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // POST api/usuarios/cerrar-sesion
        [HttpPost("cerrar-sesion")]
        public IActionResult CerrarSesion() {
			// Cerrar la sesión del usuario y retornar una respuesta 200 OK sin contenido adicional.
			servicioUsuarios.CerrarSesion();
            return Ok();
        }
    }
}
