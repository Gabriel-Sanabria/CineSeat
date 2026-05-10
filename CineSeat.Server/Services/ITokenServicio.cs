using CineSeat.Server.Models;

namespace CineSeat.Server.Services {

    public interface ITokenServicio {

        void GenerarComoCookie(Usuario usuario, bool sesionMantenida = false);
        void EliminarCookie();
    }
}
