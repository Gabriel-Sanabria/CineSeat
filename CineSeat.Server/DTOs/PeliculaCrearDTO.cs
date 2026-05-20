using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.DTOs {

    public class PeliculaCrearDTO {

        [Required(ErrorMessage = "El título es obligatorio")]
        [MaxLength(200, ErrorMessage = "El título no puede superar los 200 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "El género es obligatorio")]
        [MaxLength(50, ErrorMessage = "El género no puede superar los 50 caracteres")]
        public string Genero { get; set; } = string.Empty;

        [Required(ErrorMessage = "La clasificación es obligatoria")]
        [MaxLength(5, ErrorMessage = "La clasificación no puede superar los 5 caracteres")]
        public string Clasificacion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El director es obligatorio")]
        [MaxLength(100, ErrorMessage = "El director no puede superar los 100 caracteres")]
        public string Director { get; set; } = string.Empty;

        [Required(ErrorMessage = "La sinopsis es obligatoria")]
        [MaxLength(1000, ErrorMessage = "La sinopsis no puede superar los 1000 caracteres")]
        public string Sinopsis { get; set; } = string.Empty;

        [Range(0, int.MaxValue, ErrorMessage = "Las horas no pueden ser negativas")]
        public int DuracionHoras { get; set; }

        [Range(0, 59, ErrorMessage = "Los minutos deben estar entre 0 y 59")]
        public int DuracionMinutos { get; set; }

        [MinLength(1, ErrorMessage = "Debe incluir al menos una función")]
        public List<FuncionCrearDTO> Funciones { get; set; } = [];

        public string? PortadaBase64 { get; set; }
        public string? MIMEPortada { get; set; }
    }
}
