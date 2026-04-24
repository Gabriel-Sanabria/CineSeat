using CineSeat.Server.Data;
using CineSeat.Server.DTOs;

namespace CineSeat.Server.Services {

    public class UsuarioServicio : IUsuarioServicio {

        private readonly AppDBContext _contexto;

        public UsuarioServicio(AppDBContext contexto) {
            _contexto = contexto;
        }

        public async Task<UsuarioRespuestaDTO> Crear(UsuarioCrearDTO dto) {
            // TODO: Crear una nueva entidad Usuario a partir del dto.
            //       Agregar al contexto, guardar cambios y retornar el UsuarioRespuestaDTO con el Id generado.
            throw new NotImplementedException();
        }

        public async Task<UsuarioRespuestaDTO?> Actualizar(int id, UsuarioCrearDTO dto) {
            // TODO: Buscar el usuario por Id.
            //       Si no existe, retornar null.
            //       Si existe, actualizar sus propiedades con los valores del dto, guardar cambios
            //       y retornar el UsuarioRespuestaDTO actualizado.
            throw new NotImplementedException();
        }

        public async Task<bool> Eliminar(int id) {
            // TODO: Buscar el usuario por Id.
            //       Si no existe, retornar false.
            //       Si existe, eliminar del contexto, guardar cambios y retornar true.
            throw new NotImplementedException();
        }

        public async Task<UsuarioRespuestaDTO?> ValidarCredenciales(UsuarioCrearDTO dto) {
            // TODO: Buscar en _contexto.Usuarios el registro cuyo Correo coincida con dto.Correo.
            //       Si no existe ningún usuario con ese correo, retornar null.
            //       Si existe, usar BCrypt.Net.BCrypt.Verify(dto.Contrasena, usuario.Contrasena)
            //       para comparar la contraseña en texto plano contra el hash almacenado.
            //       Si la verificación falla, retornar null.
            //       Si es correcta, mapear el usuario a UsuarioRespuestaDTO y retornarlo.
            throw new NotImplementedException();
        }

        public async Task<bool> CorreoEnUso(string correo) {
            // TODO: Consultar _contexto.Usuarios con AnyAsync para verificar si existe
            //       algún registro cuyo Correo sea igual al parámetro correo (comparación
            //       sin distinción de mayúsculas recomendada, ej. ToLower o EF Core transliteration).
            //       Retornar true si existe al menos uno, false en caso contrario.
            throw new NotImplementedException();
        }
    }
}
