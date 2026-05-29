import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, retry } from 'rxjs/operators';
import { DashboardPelicula } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import { extraerMensajeError, filtrarPeliculas } from '../utilidades';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // Propiedades para controlar el estado de búsqueda y filtrado
  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';

  // Lista completa de películas con métricas obtenida del servidor
  peliculas: DashboardPelicula[] = [];

  // Lista de películas filtradas según el género y texto de búsqueda activos
  peliculasMostradas: DashboardPelicula[] = [];

  // Estado de carga mientras se espera la respuesta del servidor
  cargando: boolean = true;

  // Inyección de dependencias del componente
  constructor(private toastr: ToastrService, private router: Router, private dashboardService: DashboardService,) { }

  ngOnInit(): void {
    // Cargar las métricas de películas al inicializar el componente
    this.dashboardService.obtenerMetricas()
      .pipe(retry({ count: 3, delay: 1000 }), finalize(() => this.cargando = false))
      .subscribe({
        next: (datos) => {
          // Asignar la lista de películas con métricas obtenida del servidor
          this.peliculas = datos ?? [];

          // Inicializar la lista mostrada con todos los resultados
          this.aplicarFiltros(this.generoSeleccionado, this.textoBusqueda);
        },
        error: (errorHttp) => {
          // Si ocurre un error al cargar los datos de la película, preparar un mensaje de advertencia
          // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
          const advertencia = extraerMensajeError(errorHttp, 'Ocurrió un error al cargar las métricas del dashboard.');

          // Mostrar el mensaje de advertencia al usuario y navegar de vuelta a la página de la cartelera
          this.toastr.warning(advertencia);
          this.router.navigate(['/cartelera']);
        }
      });
  }

  aplicarFiltros(genero: string, texto: string): void {
    // Actualizar las propiedades de búsqueda y género seleccionado con los valores proporcionados
    this.generoSeleccionado = genero;
    this.textoBusqueda = texto;

    // Filtrar la lista de películas según el género seleccionado y el texto de búsqueda en el título
    this.peliculasMostradas = filtrarPeliculas(this.peliculas, genero, texto);
  }

  agruparPorFecha(funciones: any[]): { fecha: string; funciones: any[] }[] {
    // Agrupar las funciones por fecha utilizando un Map para organizar las funciones bajo cada fecha única
    const mapa = new Map<string, any[]>();
    for (const f of funciones) {
      if (!mapa.has(f.fecha)) mapa.set(f.fecha, []);
      mapa.get(f.fecha)!.push(f);
    }
    // Convertir el Map a un array de objetos con fecha y funciones, ordenado por fecha de forma ascendente
    return Array.from(mapa.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([fecha, funciones]) => ({ fecha, funciones }));
  }

  formatearFecha(fecha: string): string {
    // Formatear la fecha del formato "YYYY-MM-DD" al formato "DD MMM YYYY" utilizando un array de meses para convertir el número de mes a su abreviatura
    const [anio, mes, dia] = fecha.split('-');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${dia} ${meses[+mes - 1]} ${anio}`;
  }

  formatearDuracion(horas: number, minutos: number): string {
    // Formatear los minutos con dos dígitos para mantener consistencia visual (ej. "2h 08m")
    return `${horas}h ${String(minutos).padStart(2, '0')}m`;
  }
}
