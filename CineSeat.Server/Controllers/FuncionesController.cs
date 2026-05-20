using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class FuncionesController : ControllerBase {

        private readonly IFuncionServicio servicioFunciones;

        public FuncionesController(IFuncionServicio servicioFunciones) {
            this.servicioFunciones = servicioFunciones;
        }

        // POST api/funciones
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<FuncionDTO>> Crear([FromBody] FuncionCrearDTO dto) {
            try {
                // Intentar crear la función llamando al método del servicio.
                FuncionDTO resultado = await servicioFunciones.Crear(dto);
                return CreatedAtAction(nameof(Editar), new { id = resultado.Id }, resultado);
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

        // PUT api/funciones/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<FuncionDTO>> Editar(int id, [FromBody] FuncionCrearDTO dto) {
            try {
                // Intentar editar la función llamando al método del servicio.
                FuncionDTO? resultado = await servicioFunciones.Editar(id, dto);

                // Si no se encontró la función para editar, retornar una respuesta 404 Not Found con un mensaje.
                if (resultado == null) return NotFound(new { mensaje = "Función no encontrada" });

                // Si se editó la función correctamente, retornar una respuesta 200 OK con los datos actualizados.
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

        // DELETE api/funciones/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id) {
            try {
                // Intentar eliminar la función llamando al método del servicio.
                bool eliminada = await servicioFunciones.Eliminar(id);

                // Si no se encontró la función para eliminar, retornar una respuesta 404 Not Found con un mensaje.
                if (!eliminada) return NotFound(new { mensaje = "Función no encontrada" });

                // Si se eliminó la función correctamente, retornar una respuesta 204 No Content sin contenido adicional.
                return NoContent();
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }
    }
}
