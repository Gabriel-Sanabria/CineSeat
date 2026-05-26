namespace CineSeat.Server.DTOs {

    public class DashboardFuncionDTO {

        public int FuncionId { get; set; }

        public DateOnly Fecha { get; set; }

        public TimeOnly Hora { get; set; }

        public int Sala { get; set; }

        public string Tipo { get; set; } = string.Empty;

        public int Boletos { get; set; }

        public int PorcentajeOcupacion { get; set; }

        public decimal IngresosBrutos { get; set; }

        public decimal CargoServicio { get; set; }

        public decimal IngresosTotales { get; set; }
    }
}
