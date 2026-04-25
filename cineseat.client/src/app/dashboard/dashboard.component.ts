import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  emailUsuario: string = '';

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  datosPeliculas: any[] = [
    {
      pelicula: { titulo: 'La Sombra del Tiempo', genero: 'Thriller', duracion: '2h 08m' },
      funciones: [
        { hora: '14:30', tipo: '2D', porcentaje: 82, boletos: 41, ingresos: 3690 },
        { hora: '17:00', tipo: '3D', porcentaje: 55, boletos: 28, ingresos: 3360 },
        { hora: '19:30', tipo: '2D', porcentaje: 38, boletos: 19, ingresos: 1710 },
        { hora: '21:45', tipo: 'IMAX', porcentaje: 90, boletos: 36, ingresos: 5760 },
      ],
      totalBoletos: 124,
      totalIngresos: 14520
    },
    {
      pelicula: { titulo: 'Cosmos Eternal', genero: 'Sci-Fi', duracion: '2h 32m' },
      funciones: [
        { hora: '15:00', tipo: '3D', porcentaje: 72, boletos: 36, ingresos: 4320 },
        { hora: '18:30', tipo: 'IMAX', porcentaje: 95, boletos: 38, ingresos: 6080 },
      ],
      totalBoletos: 74,
      totalIngresos: 10400
    },
    {
      pelicula: { titulo: 'Noche Dorada', genero: 'Romance', duracion: '2h 01m' },
      funciones: [
        { hora: '16:00', tipo: '2D', porcentaje: 40, boletos: 20, ingresos: 1800 },
        { hora: '20:00', tipo: '2D', porcentaje: 62, boletos: 31, ingresos: 2790 },
      ],
      totalBoletos: 51,
      totalIngresos: 4590
    },
  ];

  // TODO: implementar — cargar datos reales desde el servicio
  ngOnInit(): void { }
}
