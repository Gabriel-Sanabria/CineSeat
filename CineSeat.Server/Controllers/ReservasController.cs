using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [Authorize]
    [ApiController]
    [Route("api/reservas")]
    public class ReservasController : ControllerBase {

        private readonly IReservaServicio servicioReservas;

        public ReservasController(IReservaServicio servicioReservas) {
            this.servicioReservas = servicioReservas;
        }

        // GET api/reservas/funcion/{funcionId}/asientos-ocupados
        [HttpGet("funcion/{funcionId}/asientos-ocupados")]
        public async Task<ActionResult<List<string>>> ObtenerAsientosOcupados(int funcionId) {
            try {
                // Obtener los códigos de asiento ocupados de la función y retornarlos en una respuesta 200 OK.
                List<string> asientos = await servicioReservas.ObtenerAsientosOcupados(funcionId);
                return Ok(asientos);
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        // POST api/reservas
        [HttpPost]
        public async Task<ActionResult<ReservaDTO>> Crear([FromBody] ReservaCrearDTO dto) {
            try {
                // Crear la reserva llamando al método del servicio y retornar una respuesta 200 OK con los datos.
                ReservaDTO resultado = await servicioReservas.Crear(dto);
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
    }
}
