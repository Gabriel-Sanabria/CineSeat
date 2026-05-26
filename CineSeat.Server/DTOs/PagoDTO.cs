namespace CineSeat.Server.DTOs {

    public class PagoDTO {

        public int Id { get; set; }

        public decimal Subtotal { get; set; }

        public decimal CargoServicio { get; set; }

        public decimal Total { get; set; }

        public DateTime Fecha { get; set; }
    }
}
