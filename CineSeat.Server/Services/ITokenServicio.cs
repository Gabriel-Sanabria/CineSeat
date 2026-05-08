using CineSeat.Server.Models;

namespace CineSeat.Server.Services {

    public interface ITokenServicio {

        string Generar(Usuario usuario);
    }
}
