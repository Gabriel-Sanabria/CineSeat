using CineSeat.Server.Data;
using CineSeat.Server.DTOs;
using CineSeat.Server.Mappers;
using CineSeat.Server.Models;

namespace CineSeat.Server.Services {

    public class FuncionServicio : IFuncionServicio {

        private readonly AppDBContext contextoBD;

        public FuncionServicio(AppDBContext contextoBD) {
            this.contextoBD = contextoBD;
        }

        public async Task<FuncionDTO> Crear(FuncionCrearDTO dto) {

            // Validar que la fecha y hora de la función no sean anteriores a las actuales, y que el tipo sea válido
            if (FechaEsAnteriorAHoy(dto.Fecha))
                throw new InvalidOperationException($"La fecha {dto.Fecha} no puede ser anterior a la de hoy.");
            if (HoraEsAnteriorAHora(dto.Fecha, dto.Hora))
                throw new InvalidOperationException($"La hora {dto.Hora} no puede ser anterior a la de ahora.");
            if (!TipoEsValido(dto.Tipo))
                throw new InvalidOperationException($"El tipo '{dto.Tipo}' no es válido.");

            // Crear una nueva función a partir del DTO
            Funcion nuevaFuncion = new Funcion {
                PeliculaId = dto.PeliculaId,
                Sala = $"Sala {dto.Sala}",
                Fecha = DateOnly.Parse(dto.Fecha),
                Hora = TimeOnly.Parse(dto.Hora),
                Tipo = dto.Tipo,
                Precio = dto.Precio
            };

            // Agregar la nueva función al contexto y guardar los cambios en la base de datos
            contextoBD.Funciones.Add(nuevaFuncion);
            await contextoBD.SaveChangesAsync();

            // Retornar el DTO de la función recién creada
            return FuncionMapper.MapearADTO(nuevaFuncion);
        }

        public async Task<FuncionDTO?> Editar(int id, FuncionCrearDTO dto) {

            // Obtener la función con el ID especificado de la base de datos
            Funcion? funcion = await contextoBD.Funciones.FindAsync(id);

            // Si no se encuentra la función, retornar null
            if (funcion == null) return null;

            // Validar que la fecha y hora de la función no sean anteriores a las actuales, y que el tipo sea válido
            if (FechaEsAnteriorAHoy(dto.Fecha))
                throw new InvalidOperationException($"La fecha {dto.Fecha} no puede ser anterior a la de hoy.");
            if (HoraEsAnteriorAHora(dto.Fecha, dto.Hora))
                throw new InvalidOperationException($"La hora {dto.Hora} no puede ser anterior a la de ahora.");
            if (!TipoEsValido(dto.Tipo))
                throw new InvalidOperationException($"El tipo '{dto.Tipo}' no es válido.");

            // Actualizar las propiedades de la función con los valores del DTO
            funcion.PeliculaId = dto.PeliculaId;
            funcion.Sala = $"Sala {dto.Sala}";
            funcion.Fecha = DateOnly.Parse(dto.Fecha);
            funcion.Hora = TimeOnly.Parse(dto.Hora);
            funcion.Tipo = dto.Tipo;
            funcion.Precio = dto.Precio;

            // Guardar los cambios en la base de datos y retornar el DTO de la función editada
            await contextoBD.SaveChangesAsync();
            return FuncionMapper.MapearADTO(funcion);
        }

        public async Task<bool> Eliminar(int id) {

            // Obtener la función con el ID especificado de la base de datos
            Funcion? funcion = await contextoBD.Funciones.FindAsync(id);

            // Si no se encuentra la función, retornar false
            if (funcion == null) return false;

            // Eliminar la función del contexto y guardar los cambios en la base de datos; retornar true para indicar que la eliminación fue correcta
            contextoBD.Funciones.Remove(funcion);
            await contextoBD.SaveChangesAsync();
            return true;
        }

        // --------- MÉTODOS AUXILIARES ---------
        public bool FechaEsAnteriorAHoy(string fecha) {
            if (!DateOnly.TryParse(fecha, out DateOnly fechaParseada)) return false;
            return fechaParseada < DateOnly.FromDateTime(DateTime.Now);
        }

        public bool HoraEsAnteriorAHora(string fecha, string hora) {
            if (!DateOnly.TryParse(fecha, out DateOnly fechaParseada)) return false;
            if (!TimeOnly.TryParse(hora, out TimeOnly horaParseada)) return false;
            // Combinar la fecha y hora de la función en un solo objeto DateTime para compararlo con la fecha y hora actuales.
            DateTime fechaHoraFuncion = fechaParseada.ToDateTime(horaParseada);
            return fechaHoraFuncion < DateTime.Now;
        }

        public bool TipoEsValido(string tipo) {
            // Comprobar que el tipo de función sea uno de los valores permitidos (2D, 3D, IMAX, VIP)
            string[] tiposValidos = ["2D", "3D", "IMAX", "VIP"];
            return tiposValidos.Contains(tipo);
        }
    }
}
