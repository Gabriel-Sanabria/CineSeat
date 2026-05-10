using System.ComponentModel.DataAnnotations;

namespace CineSeat.Server.DTOs {

    public class UsuarioCrearDTO {

        [Required(ErrorMessage = "El correo es obligatorio")]
        [EmailAddress(ErrorMessage = "El formato de correo no es válido")]
        public string Correo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres")]
        public string Contrasena { get; set; } = string.Empty;

        public bool SesionMantenida { get; set; } = false;
    }
}
