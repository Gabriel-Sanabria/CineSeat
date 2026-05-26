using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Data {
	public class AppDBContext : DbContext {

		public DbSet<Usuario> Usuarios { get; set; }
		public DbSet<Pelicula> Peliculas { get; set; }
		public DbSet<Funcion> Funciones { get; set; }
		public DbSet<Reserva> Reservas { get; set; }
		public DbSet<Asiento> Asientos { get; set; }
		public DbSet<Pago> Pagos { get; set; }

		public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder) {

			// Ejecutar la configuración de las entidades utilizando Fluent API
			base.OnModelCreating(modelBuilder);

			// PK compuesta de Asiento
			modelBuilder.Entity<Asiento>().HasKey(a => new { a.ReservaId, a.CodigoAsiento });

			// Relación 1-a-1 entre Reserva y Pago
			modelBuilder.Entity<Pago>().HasOne(p => p.Reserva).WithOne(r => r.Pago).HasForeignKey<Pago>(p => p.ReservaId);
			modelBuilder.Entity<Pago>().HasIndex(p => p.ReservaId).IsUnique().HasDatabaseName("UQ_Pago_ReservaId");


		}
	}
}
