using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase {

        private readonly IUsuarioServicio _servicioUsuarios;

        public UsuariosController(IUsuarioServicio servicioUsuarios) {
            _servicioUsuarios = servicioUsuarios;
        }

        // POST api/usuarios
        [HttpPost]
        public async Task<ActionResult<UsuarioRespuestaDTO>> Crear([FromBody] UsuarioCrearDTO dto) {
            // TODO: Llamar a _servicioUsuarios.Crear(dto).
            //       Retornar CreatedAtAction apuntando a un endpoint de detalle si se añade en el futuro,
            //       o simplemente Ok(resultado) mientras no exista ese endpoint.
            throw new NotImplementedException();
        }

        // POST api/usuarios/validar
        [HttpPost("validar")]
        public async Task<IActionResult> ValidarCredenciales([FromBody] UsuarioCrearDTO dto) {
            // TODO: Llamar a _servicioUsuarios.ValidarCredenciales(dto).
            //       Si retorna null, retornar Unauthorized().
            //       Si retorna un resultado válido, retornar Ok(resultado).
            throw new NotImplementedException();
        }

        // GET api/usuarios/correo-en-uso?correo=...
        [HttpGet("correo-en-uso")]
        public async Task<IActionResult> CorreoEnUso([FromQuery] string correo) {
            // TODO: Llamar a _servicioUsuarios.CorreoEnUso(correo).
            //       Retornar Ok(resultado) con el bool que indique si el correo está en uso.
            throw new NotImplementedException();
        }

        // DELETE api/usuarios/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id) {
            // TODO: Llamar a _servicioUsuarios.Eliminar(id).
            //       Si retorna false, retornar NotFound().
            //       Si retorna true, retornar NoContent().
            throw new NotImplementedException();
        }
    }
}
