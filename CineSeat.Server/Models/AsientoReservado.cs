using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class AsientoReservado {

        [Required]
        public int ReservaId { get; set; }

        [Required, MaxLength(3)]
        public string CodigoAsiento { get; set; } = string.Empty;

        public Reserva Reserva { get; set; } = null!;
    }
}
