using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.DTOs {

    public class FuncionCrearDTO {

        public int Id { get; set; }

        [Required(ErrorMessage = "La fecha es obligatoria")]
        public string Fecha { get; set; } = string.Empty;

        [Required(ErrorMessage = "La hora es obligatoria")]
        public string Hora { get; set; } = string.Empty;

        [Required(ErrorMessage = "La sala es obligatoria")]
        [Range(1, 10, ErrorMessage = "La sala debe estar entre 1 y 10")]
        public int Sala { get; set; }

        [Required(ErrorMessage = "El tipo es obligatorio")]
        [MaxLength(10, ErrorMessage = "El tipo no puede superar los 10 caracteres")]
        public string Tipo { get; set; } = string.Empty;

        [Required(ErrorMessage = "El precio es obligatorio")]
        [Range(0, double.MaxValue, ErrorMessage = "El precio no puede ser negativo")]
        public decimal Precio { get; set; }
    }
}
