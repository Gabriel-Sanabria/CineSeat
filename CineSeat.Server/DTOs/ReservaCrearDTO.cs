using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.DTOs {

    public class ReservaCrearDTO {

        [Required]
        public int FuncionId { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required]
        public List<string> Asientos { get; set; } = [];

        [Required]
        public decimal Subtotal { get; set; }

        [Required]
        public decimal CargoServicio { get; set; }

        [Required]
        public decimal Total { get; set; }
    }
}
