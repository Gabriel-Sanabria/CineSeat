import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';
import { FuncionService } from './funcion.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  // URL base para las peticiones al backend relacionadas con películas
  private readonly urlBase = '/api/peliculas';

  // Inyección de dependencias del servicio
  constructor(private http: HttpClient, private funcionService: FuncionService) { }

  // POST /api/peliculas
  crear(dto: Pelicula): Observable<Pelicula> {

    // Validación de campos de pelicula antes de enviar la solicitud al backend
    const error = this.validarCampos(dto);
    if (error) {
      return throwError(() => ({ error: { mensaje: error } }));
    }

    // Validación de campos de cada función programada de la película antes de enviar la solicitud al backend
    for (const funcion of dto.funciones) {
      const errorFuncion = this.funcionService.validarCampos(funcion);
      if (errorFuncion) {
        return throwError(() => ({ error: { mensaje: `Error en función ${dto.funciones.indexOf(funcion) + 1}: ${errorFuncion}` } }));
      }
    }

    // Realizar la solicitud POST al backend para crear una nueva película y retornar un observable con la respuesta
    return this.http.post<Pelicula>(this.urlBase, dto);
  }

  // GET /api/peliculas
  obtenerTodas(): Observable<Pelicula[]> {
    return EMPTY;
  }

  // GET /api/peliculas/:id
  obtenerPorId(id: number): Observable<Pelicula> {
    return EMPTY;
  }

  // PUT /api/peliculas/:id
  editar(id: number, dto: Pelicula): Observable<Pelicula> {
    return EMPTY;
  }

  // DELETE /api/peliculas/:id
  eliminar(id: number): Observable<void> {
    return EMPTY;
  }

  // --------- MÉTODOS AUXILIARES ---------
  private validarCampos(pelicula: Pelicula): string | null {
    if (!pelicula.titulo || !pelicula.genero || !pelicula.clasificacion || !pelicula.director || !pelicula.sinopsis) return 'Por favor, completa todos los campos.';
    if (pelicula.duracionHoras < 0 || pelicula.duracionMinutos < 0) return 'La duración no puede ser negativa.';
    if (pelicula.duracionHoras === 0 && pelicula.duracionMinutos === 0) return 'La duración no puede ser cero.';
    if (pelicula.duracionMinutos >= 60) return 'Los minutos deben ser menores a 60.';
    if (pelicula.funciones.length < 1) return 'Debe haber al menos una función.';
    return null;
  }
}
