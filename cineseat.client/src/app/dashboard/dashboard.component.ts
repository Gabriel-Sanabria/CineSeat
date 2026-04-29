import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  emailUsuario: string = '';
  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';
  generos: string[] = ['Todas', 'Thriller', 'Sci-Fi', 'Drama', 'Terror', 'Romance', 'Acción'];

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  datosPeliculas: any[] = [
    {
      pelicula: { titulo: 'La Sombra del Tiempo', genero: 'Thriller', duracion: '2h 08m' },
      funciones: [
        { fecha: '2026-04-28', hora: '14:30', sala: 1, tipo: '2D', porcentaje: 82, boletos: 41, ingresos: 3690 },
        { fecha: '2026-04-28', hora: '17:00', sala: 2, tipo: '3D', porcentaje: 55, boletos: 28, ingresos: 3360 },
        { fecha: '2026-04-28', hora: '19:30', sala: 1, tipo: '2D', porcentaje: 38, boletos: 19, ingresos: 1710 },
        { fecha: '2026-04-29', hora: '14:30', sala: 3, tipo: '2D', porcentaje: 60, boletos: 30, ingresos: 2700 },
        { fecha: '2026-04-29', hora: '21:45', sala: 4, tipo: 'IMAX', porcentaje: 90, boletos: 36, ingresos: 5760 },
      ],
      totalBoletos: 154,
      totalIngresos: 17220
    },
    {
      pelicula: { titulo: 'Cosmos Eternal', genero: 'Sci-Fi', duracion: '2h 32m' },
      funciones: [
        { fecha: '2026-04-28', hora: '15:00', sala: 2, tipo: '3D', porcentaje: 72, boletos: 36, ingresos: 4320 },
        { fecha: '2026-04-28', hora: '18:30', sala: 4, tipo: 'IMAX', porcentaje: 95, boletos: 38, ingresos: 6080 },
        { fecha: '2026-04-29', hora: '18:30', sala: 4, tipo: 'IMAX', porcentaje: 50, boletos: 20, ingresos: 3200 },
      ],
      totalBoletos: 94,
      totalIngresos: 13600
    },
    {
      pelicula: { titulo: 'Noche Dorada', genero: 'Romance', duracion: '2h 01m' },
      funciones: [
        { fecha: '2026-04-28', hora: '16:00', sala: 3, tipo: '2D', porcentaje: 40, boletos: 20, ingresos: 1800 },
        { fecha: '2026-04-29', hora: '16:00', sala: 3, tipo: '2D', porcentaje: 62, boletos: 31, ingresos: 2790 },
        { fecha: '2026-04-29', hora: '20:00', sala: 5, tipo: '2D', porcentaje: 30, boletos: 15, ingresos: 1350 },
      ],
      totalBoletos: 66,
      totalIngresos: 5940
    },
  ];

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

  filtrarPorGenero(genero: string): void {
    this.generoSeleccionado = genero;
  }

  // TODO: implementar — cargar datos reales desde el servicio
  ngOnInit(): void { }
}
