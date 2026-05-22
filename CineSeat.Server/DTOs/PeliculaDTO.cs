namespace CineSeat.Server.DTOs {

    public class PeliculaDTO {

        public int Id { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string Genero { get; set; } = string.Empty;

        public string Clasificacion { get; set; } = string.Empty;

        public string Director { get; set; } = string.Empty;

        public string Sinopsis { get; set; } = string.Empty;

        public int DuracionHoras { get; set; }

        public int DuracionMinutos { get; set; }

        public string UrlPortada { get; set; } = string.Empty;

        public List<FuncionDTO> Funciones { get; set; } = [];
    }
}
