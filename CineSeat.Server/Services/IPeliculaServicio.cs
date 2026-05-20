using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public interface IPeliculaServicio {

        Task<PeliculaDTO> Crear(PeliculaCrearDTO dto);

        Task<List<PeliculaDTO>> ObtenerTodas();

        Task<PeliculaDTO?> ObtenerPorId(int id);

        Task<PeliculaDTO?> Editar(int id, PeliculaCrearDTO dto);

        Task<bool> Eliminar(int id);

        Task<(byte[] Portada, string MIMEPortada)?> ObtenerPortada(int id);
    }
}
