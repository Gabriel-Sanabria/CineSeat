namespace CineSeat.Server.DTOs {

    public class DashboardPeliculaDTO {

        public int PeliculaId { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string Genero { get; set; } = string.Empty;

        public int DuracionHoras { get; set; }

        public int DuracionMinutos { get; set; }

        public List<DashboardFuncionDTO> Funciones { get; set; } = [];

        public int TotalBoletos { get; set; }

        public decimal TotalIngresosBrutos { get; set; }

        public decimal TotalCargoServicio { get; set; }

        public decimal TotalIngresosTotales { get; set; }
    }
}
