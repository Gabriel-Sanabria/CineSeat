import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardPelicula } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // URL base para las peticiones al backend relacionadas con las métricas del dashboard
  private readonly urlBase = '/api/dashboard';

  // Inyección de dependencias del servicio
  constructor(private http: HttpClient) { }

  // GET /api/dashboard
  obtenerMetricas(): Observable<DashboardPelicula[]> {
    // Solicitar al backend el listado de películas con sus métricas de ocupación e ingresos
    return this.http.get<DashboardPelicula[]>(this.urlBase);
  }
}
