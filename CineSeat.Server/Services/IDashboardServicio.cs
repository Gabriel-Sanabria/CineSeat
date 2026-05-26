using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IDashboardServicio {

        Task<List<DashboardPeliculaDTO>> ObtenerMetricas();
    }
}
