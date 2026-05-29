// --- DOCUMENTO DE FUNCIONES UTILITARIAS COMUNES PARA EL PROYECTO DE CINESEAT ---

export function extraerMensajeError(errorHttp: any, mensajePorDefecto: string): string {
  // Obtener el cuerpo del error devuelto por el servidor
  const cuerpo = errorHttp?.error;

  // Si el cuerpo trae errores de validación del model state, devolver el primero de ellos
  if (cuerpo?.errors) return Object.values(cuerpo.errors).flat()[0] as string;

  // Si el cuerpo trae un mensaje de error personalizado del servidor, devolverlo
  if (cuerpo?.mensaje) return cuerpo.mensaje;

  // Si no se pudo extraer ningún mensaje del servidor, devolver el texto por defecto de respaldo
  return mensajePorDefecto;
}

export function filtrarPeliculas<T extends { genero: string; titulo: string }>(lista: T[], genero: string, texto: string): T[] {
  // Convertir el texto de búsqueda a minúsculas y eliminar espacios en blanco para una comparación más flexible
  const textoBusqueda = texto.toLowerCase().trim();

  // Filtrar la lista según el género seleccionado y el texto de búsqueda en el título
  return lista.filter(pelicula => {
    const coincideGenero = genero === 'Todas' || pelicula.genero === genero;
    const coincideTexto = !textoBusqueda || pelicula.titulo.toLowerCase().includes(textoBusqueda);
    return coincideGenero && coincideTexto;
  });
}

export function leerImagenPortada(archivo: File): Promise<{ urlPortada: string; base64: string; mime: string }> {
  return new Promise(resolve => {
    // Generar una URL de vista previa temporal a partir del archivo para mostrar la imagen antes de subirla
    const urlPortada = URL.createObjectURL(archivo);
    // Crear un FileReader para leer el contenido del archivo como URL de datos en base64
    const reader = new FileReader();
    reader.onload = () => {
      // Extraer únicamente la parte base64 de la URL de datos (eliminar el prefijo "data:<mime>;base64,")
      const resultado = reader.result as string;
      resolve({ urlPortada, base64: resultado.split(',')[1], mime: archivo.type });
    };
    // Iniciar la lectura del archivo como URL de datos (dispara el evento onload al finalizar)
    reader.readAsDataURL(archivo);
  });
}
