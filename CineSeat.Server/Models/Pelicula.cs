using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class Pelicula {

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Genero { get; set; } = string.Empty;

        [Required]
        public int DuracionMinutos { get; set; }

        [Required, MaxLength(5)]
        public string Clasificacion { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Director { get; set; } = string.Empty;

        [Required, MaxLength(1000)]
        public string Sinopsis { get; set; } = string.Empty;

        public byte[]? Portada { get; set; }

        [MaxLength(100)]
        public string? MIMEPortada { get; set; }

        public ICollection<Funcion> Funciones { get; set; } = [];
    }
}
