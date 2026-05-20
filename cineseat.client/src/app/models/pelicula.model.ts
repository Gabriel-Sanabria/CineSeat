import { Funcion } from './funcion.model';

export interface Pelicula {
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
