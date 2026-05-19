using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class Funcion {

        [Key]
        public int Id { get; set; }

        [Required]
        public int PeliculaId { get; set; }

        [Required, MaxLength(50)]
        public string Sala { get; set; } = string.Empty;

        [Required]
        public DateOnly Fecha { get; set; }

        [Required]
        public TimeOnly Hora { get; set; }

        [Required, MaxLength(10)]
        public string Tipo { get; set; } = string.Empty;

        [Required, Precision(8, 2)]
        public decimal Precio { get; set; }

        public Pelicula Pelicula { get; set; } = null!;

        public ICollection<Reserva> Reservas { get; set; } = [];
    }
}
