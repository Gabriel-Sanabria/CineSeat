import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Funcion } from '../models/funcion.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {

  // URL base para las peticiones al backend relacionadas con funciones
  private readonly urlBase = '/api/funciones';

  // Inyección de dependencias del servicio
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  // POST /api/funciones
  crear(dto: Funcion): Observable<Funcion> {
    return EMPTY;
  }

  // PUT /api/funciones/:id
  editar(id: number, dto: Funcion): Observable<Funcion> {
    return EMPTY;
  }

  // DELETE /api/funciones/:id
  eliminar(id: number): Observable<void> {
    return EMPTY;
  }

  // --------- MÉTODOS AUXILIARES ---------
  public validarCampos(funcion: Funcion): string | null {
    if (!funcion.fecha || !funcion.hora || !funcion.sala || !funcion.tipo) return 'Por favor, completa todos los campos.';
    const fechaHoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    const horaActual = this.datePipe.transform(new Date(), 'HH:mm')!;
    if (funcion.fecha < fechaHoy) return 'La fecha no puede ser anterior a hoy.';
    if (funcion.fecha === fechaHoy && funcion.hora < horaActual) return 'La hora no puede ser anterior a la hora actual.';
    if (funcion.precio < 0) return 'El precio no puede ser negativo.';
    return null;
  }
}
