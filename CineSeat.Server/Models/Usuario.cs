using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.Models {

    public class Usuario {

        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Correo { get; set; }

        // Hash por bcrypt — siempre 60 caracteres
        [MaxLength(60)]
        public string? Contrasena { get; set; }
    }
}
