// Modelo de datos para las funciones de películas
export interface Funcion {
  id?: number;
  fecha: string;
  hora: string;
  sala: number;
  tipo: string;
  precio: number;

  // Opcional: solo existe en respuestas del API, no al crear/editar funciones
  asientosDisponibles?: number;
}
