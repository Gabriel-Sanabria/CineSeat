using Microsoft.EntityFrameworkCore;
using CineSeat.Server.Data;

namespace CineSeat.Server {
	public class Program {
		public static void Main(string[] args) {

			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddDbContext<AppDBContext>(options => { options.UseSqlServer(builder.Configuration.GetConnectionString("CineSeat")); });

			builder.Services.AddControllers();
			// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
			builder.Services.AddOpenApi();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.MapStaticAssets();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment()) {
				app.MapOpenApi();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
