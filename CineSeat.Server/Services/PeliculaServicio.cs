using CineSeat.Server.Data;
using CineSeat.Server.DTOs;
using CineSeat.Server.Mappers;
using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Services {

    public class PeliculaServicio : IPeliculaServicio {

        private readonly AppDBContext contextoBD;
        private readonly IFuncionServicio servicioFunciones;

        public PeliculaServicio(AppDBContext contextoBD, IFuncionServicio servicioFunciones) {
            this.contextoBD = contextoBD;
            this.servicioFunciones = servicioFunciones;
        }

        public async Task<PeliculaDTO> Crear(PeliculaCrearDTO dto) {

			// Validar que la duración total no sea cero (tanto horas como minutos)
			if (DuracionEsCero(dto.DuracionHoras, dto.DuracionMinutos))
                throw new InvalidOperationException("La duración no puede ser cero.");

			// Validar que se haya incluido al menos una función para la película
			if (FuncionesVacias(dto.Funciones))
                throw new InvalidOperationException("Debe incluir al menos una función.");

			// Delegar la validación de cada función al servicio de funciones antes de tocar la base de datos
			foreach (FuncionCrearDTO funcion in dto.Funciones) {
                if (servicioFunciones.FechaEsAnteriorAHoy(funcion.Fecha))
                    throw new InvalidOperationException($"La fecha {funcion.Fecha} no puede ser anterior a la de hoy.");
                if (servicioFunciones.HoraEsAnteriorAHora(funcion.Fecha, funcion.Hora))
                    throw new InvalidOperationException($"La hora {funcion.Hora} no puede ser anterior a la de ahora.");
                if (!servicioFunciones.TipoEsValido(funcion.Tipo))
                    throw new InvalidOperationException($"El tipo '{funcion.Tipo}' no es válido.");
            }

			// Crear una transacción para crear la película y todas sus funciones en un solo movimiento de base de datos
			await using var transaccion = await contextoBD.Database.BeginTransactionAsync();
            try {
				// Crear la película a partir del DTO
				Pelicula nuevaPelicula = new Pelicula {
                    Titulo = dto.Titulo,
                    Genero = dto.Genero,
                    Clasificacion = dto.Clasificacion,
                    Director = dto.Director,
                    Sinopsis = dto.Sinopsis,
                    DuracionMinutos = dto.DuracionHoras * 60 + dto.DuracionMinutos,
                    Portada = dto.PortadaBase64 != null ? Convert.FromBase64String(dto.PortadaBase64) : null,
                    MIMEPortada = dto.MIMEPortada,
					// Las funciones se crean a partir de los DTOs de funciones, asignándoles la película recién creada
					Funciones = dto.Funciones.Select(f => new Funcion {
                        Sala = $"Sala {f.Sala}",
                        Fecha = f.Fecha,
                        Hora = TimeOnly.Parse(f.Hora),
                        Tipo = f.Tipo,
                        Precio = f.Precio
                    }).ToList()
                };

				// Agregar la película al contexto y guardar los cambios en la base de datos
				contextoBD.Peliculas.Add(nuevaPelicula);
                await contextoBD.SaveChangesAsync();

				// Confirmar la transacción completa de la película y sus funciones
				await transaccion.CommitAsync();

				// Mapear la película recién creada a un DTO y retornarla
				return PeliculaMapper.MapearADTO(nuevaPelicula);
            }
            catch {
				// Si ocurre algún error durante la transacción , revertir todos los cambios realizados en la base de datos para mantener consistencia de los datos, y relanzar la excepción
				await transaccion.RollbackAsync();
                throw;
            }
        }

        public async Task<List<PeliculaDTO>> ObtenerTodas() {
			// Obtener todas las películas de la base de datos, incluyendo sus funciones, y mapearlas a DTOs antes de retornarlas
			List<Pelicula> peliculas = await contextoBD.Peliculas.Include(p => p.Funciones).ToListAsync();
            return peliculas.Select(PeliculaMapper.MapearADTO).ToList();
        }

        public async Task<PeliculaDTO?> ObtenerPorId(int id) {
			// Obtener la película con el ID especificado de la base de datos, incluyendo sus funciones.
			Pelicula? pelicula = await contextoBD.Peliculas.Include(p => p.Funciones).FirstOrDefaultAsync(p => p.Id == id);

			// Si no se encuentra la película, retornar null
			if (pelicula == null) return null;

			// Si se encuentra la película, mapearla a un DTO y retornarla
			return PeliculaMapper.MapearADTO(pelicula);
        }

        public async Task<PeliculaDTO?> Editar(int id, PeliculaCrearDTO dto) {

			// Obtener la película existente con el ID especificado de la base de datos, incluyendo sus funciones.
			Pelicula? pelicula = await contextoBD.Peliculas.Include(p => p.Funciones).FirstOrDefaultAsync(p => p.Id == id);

			// Si no se encontró la película, retornar null
			if (pelicula == null) return null;

			// Validar que la duración total no sea cero (tanto horas como minutos)
			if (DuracionEsCero(dto.DuracionHoras, dto.DuracionMinutos))
                throw new InvalidOperationException("La duración no puede ser cero.");

			// Validar que se haya incluido al menos una función para la película
			if (FuncionesVacias(dto.Funciones))
                throw new InvalidOperationException("Debe incluir al menos una función.");

			// Delegar la validación de cada función al servicio de funciones antes de tocar la base de datos
			foreach (FuncionCrearDTO funcion in dto.Funciones) {
                if (servicioFunciones.FechaEsAnteriorAHoy(funcion.Fecha))
                    throw new InvalidOperationException($"La fecha {funcion.Fecha} no puede ser anterior a hoy.");
                if (servicioFunciones.HoraEsAnteriorAHora(funcion.Fecha, funcion.Hora))
                    throw new InvalidOperationException($"La hora {funcion.Hora} no puede ser anterior a ahora.");
                if (!servicioFunciones.TipoEsValido(funcion.Tipo))
                    throw new InvalidOperationException($"El tipo '{funcion.Tipo}' no es válido.");
            }

			// Crear una transacción para actualizar la película y reemplazar todas sus funciones en un solo movimiento de base de datos
			await using var transaccion = await contextoBD.Database.BeginTransactionAsync();
            try {
				// Actualizar la película a partir del DTO
				pelicula.Titulo = dto.Titulo;
                pelicula.Genero = dto.Genero;
                pelicula.Clasificacion = dto.Clasificacion;
                pelicula.Director = dto.Director;
                pelicula.Sinopsis = dto.Sinopsis;
                pelicula.DuracionMinutos = dto.DuracionHoras * 60 + dto.DuracionMinutos;

				// Actualizar la portada solo si viene en el DTO para no borrar una portada existente
				if (dto.PortadaBase64 != null) {
                    pelicula.Portada = Convert.FromBase64String(dto.PortadaBase64);
                    pelicula.MIMEPortada = dto.MIMEPortada;
                }

				// Las funciones existentes se eliminan y se reemplazan con las del DTO, asignándoles la película editada
				contextoBD.Funciones.RemoveRange(pelicula.Funciones);
                pelicula.Funciones = dto.Funciones.Select(f => new Funcion {
                    PeliculaId = id,
                    Sala = $"Sala {f.Sala}",
                    Fecha = f.Fecha,
                    Hora = TimeOnly.Parse(f.Hora),
                    Tipo = f.Tipo,
                    Precio = f.Precio
                }).ToList();

				// Guardar los cambios en la base de datos
				await contextoBD.SaveChangesAsync();

				// Confirmar la transacción completa de la película y sus funciones
				await transaccion.CommitAsync();

				// Mapear la película editada a un DTO y retornarla
				return PeliculaMapper.MapearADTO(pelicula);
            }
            catch {
				// Si ocurre algún error durante la transacción, revertir todos los cambios realizados en la base de datos para mantener consistencia de los datos, y relanzar la excepción
				await transaccion.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> Eliminar(int id) {

			// Obtener la película con el ID especificado de la base de datos.
			Pelicula? pelicula = await contextoBD.Peliculas.FindAsync(id);

			// Si no se encuentra la película, retornar false
			if (pelicula == null) return false;

			// Eliminar la película del contexto y guardar los cambios en la base de datos; retornar true para indicar que la eliminación correcta
			contextoBD.Peliculas.Remove(pelicula);
            await contextoBD.SaveChangesAsync();
            return true;
        }

        public async Task<(byte[] Portada, string MIMEPortada)?> ObtenerPortada(int id) {

			// Obtener los datos de la portada con el ID especificado de la base de datos, seleccionando solo los campos de portada y su tipo MIME.
			var datos = await contextoBD.Peliculas.Where(p => p.Id == id).Select(p => new { p.Portada, p.MIMEPortada }).FirstOrDefaultAsync();

			// Si no se encuentran los datos de la portada de la película, retornar null.
			if (datos == null || datos.Portada == null || datos.MIMEPortada == null) return null;

			// Si se encuentran los datos, retornarlos como una tupla.
			return (datos.Portada, datos.MIMEPortada);
        }

        // --------- MÉTODOS AUXILIARES ---------
        private static bool DuracionEsCero(int horas, int minutos) => horas == 0 && minutos == 0;

        private static bool FuncionesVacias(List<FuncionCrearDTO> funciones) => funciones.Count == 0;
    }
}
