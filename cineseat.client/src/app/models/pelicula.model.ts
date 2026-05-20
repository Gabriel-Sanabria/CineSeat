export interface Pelicula {
  titulo: string;
  genero: string;
  clasificacion: string;
  director: string;
  sinopsis: string;
  duracionHoras: number;
  duracionMinutos: number;
  urlPortada: string;
  funciones: Funcion[];
}

export interface Funcion {
  fecha: string;
  hora: string;
  sala: number;
  tipo: string;
  precio: number;
}
