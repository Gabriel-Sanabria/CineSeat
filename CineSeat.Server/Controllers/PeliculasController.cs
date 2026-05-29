using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculasController : ControllerBase {

        private readonly IPeliculaServicio servicioPeliculas;

        public PeliculasController(IPeliculaServicio servicioPeliculas) {
            this.servicioPeliculas = servicioPeliculas;
        }

		// POST api/peliculas
		[HttpPost]
        public async Task<ActionResult<PeliculaDTO>> Crear([FromBody] PeliculaCrearDTO dto) {
            try {
                // Intentar crear la película llamando al metodo del servicio.
                PeliculaDTO resultado = await servicioPeliculas.Crear(dto);
                return CreatedAtAction(nameof(ObtenerPorId), new { id = resultado.Id }, resultado);
            }
            catch (InvalidOperationException ex) {
                // Si ocurre un error de validación, retornar una respuesta 400 Bad Request con el mensaje del error.
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // GET api/peliculas
        [HttpGet]
        public async Task<ActionResult<List<PeliculaDTO>>> ObtenerTodas() {
            try {
                // Llamar al servicio para obtener la lista de películas y retornar una respuesta 200 OK con los datos.
                List<PeliculaDTO> resultado = await servicioPeliculas.ObtenerTodas();
                return Ok(resultado);
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // GET api/peliculas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PeliculaDTO>> ObtenerPorId(int id) {
            try {
                // Intentar obtener la película por su ID llamando al método del servicio.
                PeliculaDTO? resultado = await servicioPeliculas.ObtenerPorId(id);

                // Si no se encontró la película, retornar una respuesta 404 Not Found con un mensaje.
                if (resultado == null) return NotFound(new { mensaje = "Película no encontrada" });

                // Si se encontró la película, retornar una respuesta 200 OK con los datos.
                return Ok(resultado);
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // GET api/peliculas/{id}/portada
        [HttpGet("{id}/portada")]
        public async Task<IActionResult> ObtenerPortada(int id) {
			// Intentar obtener la portada de la película por su ID llamando al método del servicio.
			var portada = await servicioPeliculas.ObtenerPortada(id);

			// Si no se encontró la película o no tiene portada, retornar una respuesta 404 Not Found con un mensaje.
			if (portada == null) return NotFound(new { mensaje = "Portada no encontrada" });

			// Si se encontró la portada, retornar una respuesta 200 OK con el archivo de la portada y su tipo MIME.
			return File(portada.Value.Portada, portada.Value.MIMEPortada);
        }

		// PUT api/peliculas/{id}
		[HttpPut("{id}")]
        public async Task<ActionResult<PeliculaDTO>> Editar(int id, [FromBody] PeliculaCrearDTO dto) {
            try {
                // Intentar editar la película llamando al método del servicio.
                PeliculaDTO? resultado = await servicioPeliculas.Editar(id, dto);

                // Si no se encontró la película para editar, retornar una respuesta 404 Not Found con un mensaje.
                if (resultado == null) return NotFound(new { mensaje = "Película no encontrada" });

                // Si se editó la película correctamente, retornar una respuesta 200 OK con los datos actualizados.
                return Ok(resultado);
            }
            catch (InvalidOperationException ex) {
                // Si ocurre un error de validación, retornar una respuesta 400 Bad Request con el mensaje del error.
                return BadRequest(new { mensaje = ex.Message });
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

		// DELETE api/peliculas/{id}
		[HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id) {
            try {
                // Intentar eliminar la película llamando al método del servicio.
                bool eliminada = await servicioPeliculas.Eliminar(id);

                // Si no se encontró la película para eliminar, retornar una respuesta 404 Not Found con un mensaje.
                if (!eliminada) return NotFound(new { mensaje = "Película no encontrada" });

                // Si se eliminó la película correctamente, retornar una respuesta 204 No Content sin contenido adicional.
                return NoContent();
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }
    }
}
