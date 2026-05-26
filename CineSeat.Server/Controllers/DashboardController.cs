using CineSeat.Server.DTOs;
using CineSeat.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineSeat.Server.Controllers {

    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase {

        private readonly IDashboardServicio servicioDashboard;

        public DashboardController(IDashboardServicio servicioDashboard) {
            this.servicioDashboard = servicioDashboard;
        }

        // GET api/dashboard
        [HttpGet]
        public async Task<ActionResult<List<DashboardPeliculaDTO>>> ObtenerMetricas() {
            try {
                // Llamar al servicio para obtener las métricas del dashboard y retornar una respuesta 200 OK con los datos.
                List<DashboardPeliculaDTO> resultado = await servicioDashboard.ObtenerMetricas();
                return Ok(resultado);
            }
            catch (Exception) {
                // Si un error desconocido ocurre, retornar una respuesta 500 Internal Server Error con un mensaje genérico.
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }
    }
}
