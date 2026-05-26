import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, retry } from 'rxjs/operators';
import { DashboardPelicula } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';

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
  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }

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
          // Mensaje de advertencia predeterminado si el servidor no devuelve uno
          let advertencia = 'Ocurrió un error al cargar las métricas del dashboard.';

          // Intentar extraer el mensaje de error devuelto por el servidor
          const cuerpo = errorHttp?.error;
          if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
          if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

          // Mostrar el mensaje de advertencia al usuario
          this.toastr.warning(advertencia);
        }
      });
  }

  aplicarFiltros(genero: string, texto: string): void {
    // Actualizar las propiedades de búsqueda y género seleccionado con los valores proporcionados
    this.generoSeleccionado = genero;
    this.textoBusqueda = texto;

    // Convertir el texto de búsqueda a minúsculas y eliminar espacios en blanco para una comparación más flexible
    const textoBusqueda = texto.toLowerCase().trim();

    // Filtrar la lista de películas según el género seleccionado y el texto de búsqueda en el título
    this.peliculasMostradas = this.peliculas.filter(pelicula => {
      const coincideGenero = genero === 'Todas' || pelicula.genero === genero;
      const coincideTexto = !textoBusqueda || pelicula.titulo.toLowerCase().includes(textoBusqueda);
      return coincideGenero && coincideTexto;
    });
  }

  agruparPorFecha(funciones: any[]): { fecha: string; funciones: any[] }[] {
    const mapa = new Map<string, any[]>();
    for (const f of funciones) {
      if (!mapa.has(f.fecha)) mapa.set(f.fecha, []);
      mapa.get(f.fecha)!.push(f);
    }
    return Array.from(mapa.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([fecha, funciones]) => ({ fecha, funciones }));
  }

  formatearFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${dia} ${meses[+mes - 1]} ${anio}`;
  }

  formatearDuracion(horas: number, minutos: number): string {
    // Formatear los minutos con dos dígitos para mantener consistencia visual (ej. "2h 08m")
    return `${horas}h ${String(minutos).padStart(2, '0')}m`;
  }
}
