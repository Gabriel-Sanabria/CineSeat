using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class Reserva {

        [Key]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required]
        public int FuncionId { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }

        public Usuario Usuario { get; set; } = null!;

        public Funcion Funcion { get; set; } = null!;

        public ICollection<Asiento> Asientos { get; set; } = [];

        public Pago? Pago { get; set; }
    }
}
