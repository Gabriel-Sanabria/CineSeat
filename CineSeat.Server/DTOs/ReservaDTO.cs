namespace CineSeat.Server.DTOs {

    public class ReservaDTO {

        public int Id { get; set; }

        public int FuncionId { get; set; }

        public int UsuarioId { get; set; }

        public DateTime FechaCreacion { get; set; }

        public List<string> Asientos { get; set; } = [];

        public PagoDTO Pago { get; set; } = null!;
    }
}
