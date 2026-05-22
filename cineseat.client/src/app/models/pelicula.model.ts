import { Funcion } from './funcion.model';

// Modelo de datos para las películas
export interface Pelicula {
  id?: number;
  titulo: string;
  genero: string;
  clasificacion: string;
  duracionHoras: number;
  duracionMinutos: number;
  director: string;
  sinopsis: string;
  urlPortada: string;
  portadaBase64?: string;
  mimePortada?: string;
  funciones: Funcion[];
}
