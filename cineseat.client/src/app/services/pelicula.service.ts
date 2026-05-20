import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private readonly urlBase = '/api/peliculas';

  constructor(private http: HttpClient) { }

  // GET /api/peliculas
  obtenerTodas(): Observable<Pelicula[]> {
    return EMPTY;
  }

  // GET /api/peliculas/:id
  obtenerPorId(id: number): Observable<Pelicula> {
    return EMPTY;
  }

  // POST /api/peliculas
  crear(pelicula: Pelicula): Observable<Pelicula> {
    return EMPTY;
  }

  // PUT /api/peliculas/:id
  actualizar(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return EMPTY;
  }

  // DELETE /api/peliculas/:id
  eliminar(id: number): Observable<void> {
    return EMPTY;
  }
}
