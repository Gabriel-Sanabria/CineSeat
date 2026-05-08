using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class Usuario {

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Correo { get; set; } = string.Empty;

        // Hash por bcrypt — siempre 60 caracteres
        [Required, MaxLength(60)]
        public string Contrasena { get; set; } = string.Empty;
    }
}
