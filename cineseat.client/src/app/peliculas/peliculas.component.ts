import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  constructor(private router: Router) { }


  emailUsuario: string = '';
  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';

  generos: string[] = ['Todas', 'Thriller', 'Sci-Fi', 'Drama', 'Terror', 'Romance', 'Acción'];

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  peliculas: any[] = [
    { id: 1, titulo: 'La Sombra del Tiempo', genero: 'Thriller', duracion: '2h 08m', calificacion: 8.6, clasificacion: 'R', director: 'Ana Reyes' },
    { id: 2, titulo: 'Cosmos Eternal', genero: 'Sci-Fi', duracion: '2h 32m', calificacion: 9.1, clasificacion: 'PG-13', director: 'Marco Silva' },
    { id: 3, titulo: 'Río Sin Retorno', genero: 'Drama', duracion: '1h 55m', calificacion: 7.8, clasificacion: 'PG-13', director: 'Lucía Méndez' },
    { id: 4, titulo: 'El Último Acto', genero: 'Terror', duracion: '1h 48m', calificacion: 7.2, clasificacion: 'R', director: 'Carlos Vega' },
    { id: 5, titulo: 'Noche Dorada', genero: 'Romance', duracion: '2h 01m', calificacion: 8.0, clasificacion: 'PG', director: 'Sofía Ruiz' },
    { id: 6, titulo: 'Horizonte Rojo', genero: 'Acción', duracion: '2h 20m', calificacion: 7.5, clasificacion: 'PG-13', director: 'Jesús Mora' },
  ];

  // TODO: implementar
  filtrarPorGenero(genero: string): void {
    this.generoSeleccionado = genero;
  }

  nuevaPelicula(): void {
    this.router.navigate(['/peliculas/crear']);
  }

  editarPelicula(pelicula: any): void {
    this.router.navigate(['/peliculas/editar', pelicula.id]);
  }
}
