import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Funcion } from '../models/funcion.model';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  // URL base para las peticiones al backend relacionadas con películas
  private readonly urlBase = '/api/peliculas';

  // Caché en memoria del listado de películas; se reutiliza entre navegaciones para evitar repetir peticiones
  private cachePeliculas$: Observable<Pelicula[]> | null = null;

  // Inyección de dependencias del servicio
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  // POST /api/peliculas
  crear(dto: Pelicula): Observable<Pelicula> {

    // Validación de campos de pelicula antes de enviar la solicitud al backend
    const error = this.validarCamposPelicula(dto);
    if (error) {
      return throwError(() => ({ error: { mensaje: error } }));
    }

    // Validación de campos de cada función programada de la película antes de enviar la solicitud al backend
    for (const funcion of dto.funciones) {
      const errorFuncion = this.validarCamposFuncion(funcion);
      if (errorFuncion) {
        return throwError(() => ({ error: { mensaje: `Error en función ${dto.funciones.indexOf(funcion) + 1}: ${errorFuncion}` } }));
      }
    }

    // Realizar la solicitud POST al backend para crear una nueva película e invalidar el caché ante una respuesta exitosa
    return this.http.post<Pelicula>(this.urlBase, dto).pipe(tap(() => this.invalidarCache()));
  }

  // GET /api/peliculas
  obtenerTodas(): Observable<Pelicula[]> {
    // Si no hay caché activo, hacer la solicitud GET al backend y compartirla con shareReplay para que las próximas suscripciones reutilicen el resultado
    if (!this.cachePeliculas$) {
      this.cachePeliculas$ = this.http.get<Pelicula[]>(this.urlBase).pipe(shareReplay(1));
    }
    return this.cachePeliculas$;
  }

  // GET /api/peliculas/:id
  obtenerPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.urlBase}/${id}`);
  }

  // PUT /api/peliculas/:id
  editar(id: number, dto: Pelicula): Observable<Pelicula> {
    // Realizar la solicitud PUT al backend para editar una película e invalidar el caché ante una respuesta exitosa
    return this.http.put<Pelicula>(`${this.urlBase}/${id}`, dto).pipe(tap(() => this.invalidarCache()));
  }

  // DELETE /api/peliculas/:id
  eliminar(id: number): Observable<void> {
    // Realizar la solicitud DELETE al backend para eliminar una película e invalidar el caché ante una respuesta exitosa
    return this.http.delete<void>(`${this.urlBase}/${id}`).pipe(tap(() => this.invalidarCache()));
  }

  // --------- MÉTODOS AUXILIARES ---------
  private invalidarCache(): void {
    // Limpiar la referencia para que el próximo obtenerTodas dispare un GET nuevo al backend
    this.cachePeliculas$ = null;
  }

  private validarCamposPelicula(pelicula: Pelicula): string | null {
    if (!pelicula.titulo || !pelicula.genero || !pelicula.clasificacion || !pelicula.director || !pelicula.sinopsis) return 'Por favor, completa todos los campos.';
    if (pelicula.duracionHoras < 0 || pelicula.duracionMinutos < 0) return 'La duración no puede ser negativa.';
    if (pelicula.duracionHoras === 0 && pelicula.duracionMinutos === 0) return 'La duración no puede ser cero.';
    if (pelicula.duracionMinutos >= 60) return 'Los minutos deben ser menores a 60.';
    if (pelicula.funciones.length < 1) return 'Debe haber al menos una función.';
    return null;
  }

  private validarCamposFuncion(funcion: Funcion): string | null {
    if (!funcion.fecha || !funcion.hora || !funcion.sala || !funcion.tipo) return 'Por favor, completa todos los campos.';
    const fechaHoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    const horaActual = this.datePipe.transform(new Date(), 'HH:mm')!;
    if (funcion.fecha < fechaHoy) return 'La fecha no puede ser anterior a hoy.';
    if (funcion.fecha === fechaHoy && funcion.hora < horaActual) return 'La hora no puede ser anterior a la hora actual.';
    if (funcion.precio < 0) return 'El precio no puede ser negativo.';
    return null;
  }
}
