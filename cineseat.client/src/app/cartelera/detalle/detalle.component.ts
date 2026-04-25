import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  constructor(private router: Router, private ruta: ActivatedRoute) { }

  emailUsuario: string = '';
  fechaSeleccionada: string = '';
  funcionSeleccionada: any = null;

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  pelicula: any = {
    id: 1,
    titulo: 'La Sombra del Tiempo',
    genero: 'Thriller',
    duracion: '2h 08m',
    calificacion: 8.6,
    clasificacion: 'R',
    director: 'Ana Reyes',
    sinopsis: 'Un detective retirado descubre que los crímenes del pasado nunca se olvidan cuando una serie de muertes misteriosas lo arrastra de regreso a su oscuro pasado. Una historia de redención y suspenso que mantiene al espectador al borde de la butaca.',
  };

  funciones: any[] = [
    { id: 1, hora: '14:30', sala: 'Sala 1', tipo: '2D', asientosDisponibles: 42, precio: 90 },
    { id: 2, hora: '17:00', sala: 'Sala 2', tipo: '3D', asientosDisponibles: 28, precio: 120 },
    { id: 3, hora: '19:30', sala: 'Sala 3', tipo: '2D', asientosDisponibles: 15, precio: 90 },
    { id: 4, hora: '21:45', sala: 'Sala VIP', tipo: 'IMAX', asientosDisponibles: 8, precio: 160 },
  ];

  estrellas: number[] = [1, 2, 3, 4, 5];

  volver(): void {
    this.router.navigate(['/cartelera']);
  }

  seleccionarFuncion(funcion: any): void {
    this.funcionSeleccionada = funcion;
  }

  irAReserva(): void {
    const idPelicula = this.ruta.snapshot.paramMap.get('id') ?? this.pelicula.id;
    const idFuncion = this.funcionSeleccionada?.id ?? this.funciones[0].id;
    this.router.navigate(['/cartelera', idPelicula, 'reserva', idFuncion]);
  }
}
