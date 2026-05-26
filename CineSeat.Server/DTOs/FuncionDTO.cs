namespace CineSeat.Server.DTOs {

    public class FuncionDTO {

        public int Id { get; set; }

        public int PeliculaId { get; set; }

        public int Sala { get; set; }

        public DateOnly Fecha { get; set; }

        public TimeOnly Hora { get; set; }

        public string Tipo { get; set; } = string.Empty;

        public decimal Precio { get; set; }

        public int AsientosDisponibles { get; set; }
    }
}
