using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CineSeat.Server.Data;
using CineSeat.Server.Services;

namespace CineSeat.Server {
	public class Program {
		public static void Main(string[] args) {

			var builder = WebApplication.CreateBuilder(args);

			// Servicio de Entity Framework Core con SQL Server
			builder.Services.AddDbContext<AppDBContext>(options => { options.UseSqlServer(builder.Configuration.GetConnectionString("CineSeat")); });

			// Servicio de autenticación JWT Bearer (lee el token desde la cookie HttpOnly)
			builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
				options.TokenValidationParameters = new TokenValidationParameters {
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Llave"]!)),
					ValidateIssuer = true,
					ValidIssuer = builder.Configuration["Jwt:Emisor"],
					ValidateAudience = true,
					ValidAudience = builder.Configuration["Jwt:Audiencia"],
					ValidateLifetime = true
				};
				options.Events = new JwtBearerEvents {
					OnMessageReceived = context => {
						context.Token = context.Request.Cookies["cineseat_token"];
						return Task.CompletedTask;
					}
				};
			});

			// Acceso al contexto HTTP desde servicios
			builder.Services.AddHttpContextAccessor();

			// Servicios de la aplicación
			builder.Services.AddScoped<ITokenServicio, TokenServicio>();
			builder.Services.AddScoped<IUsuarioServicio, UsuarioServicio>();

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

			app.UseAuthentication();
			app.UseAuthorization();

			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
