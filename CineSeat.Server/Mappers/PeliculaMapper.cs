using CineSeat.Server.DTOs;
using CineSeat.Server.Models;

namespace CineSeat.Server.Mappers {

    public static class PeliculaMapper {

        public static PeliculaDTO MapearADTO(Pelicula pelicula) {
			// Mapear la película a un DTO, calculando las horas y minutos de duración, y formateando la URL de la portada (si existe).
			return new PeliculaDTO {
                Id = pelicula.Id,
                Titulo = pelicula.Titulo,
                Genero = pelicula.Genero,
                Clasificacion = pelicula.Clasificacion,
                Director = pelicula.Director,
                Sinopsis = pelicula.Sinopsis,
                DuracionHoras = pelicula.DuracionMinutos / 60,
                DuracionMinutos = pelicula.DuracionMinutos % 60,
                UrlPortada = pelicula.Portada != null ? $"/api/peliculas/{pelicula.Id}/portada" : "",
                Funciones = pelicula.Funciones.Select(FuncionMapper.MapearADTO).ToList()
            };
        }
    }
}
