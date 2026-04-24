using CineSeat.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CineSeat.Server.Data {
	public class AppDBContext : DbContext {

		public DbSet<Usuario> Usuarios { get; set; }

		public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) {  }
	}
}
