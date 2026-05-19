using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Models {

    public class Pago {

        [Key]
        public int Id { get; set; }

        [Required]
        public int ReservaId { get; set; }

        [Required, Precision(8, 2)]
        public decimal Subtotal { get; set; }

        [Required, Precision(8, 2)]
        public decimal CargoServicio { get; set; }

        [Required, Precision(8, 2)]
        public decimal Total { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        public Reserva Reserva { get; set; } = null!;
    }
}
