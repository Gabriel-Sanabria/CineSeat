import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.css'
})
export class CarteleraComponent {
  constructor(private router: Router) { }

  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';
  emailUsuario: string = '';

  generos: string[] = ['Todas', 'Thriller', 'Sci-Fi', 'Drama', 'Terror', 'Romance', 'Acción'];

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  peliculas: any[] = [
    { id: 1, titulo: 'La Sombra del Tiempo', genero: 'Thriller', duracion: '2h 08m', calificacion: 8.6, clasificacion: 'R', director: 'Ana Reyes', sinopsis: 'Un detective retirado descubre que los crímenes del pasado nunca se olvidan cuando una serie de muertes misteriosas lo arrastra de regreso a su oscuro pasado.' },
    { id: 2, titulo: 'Cosmos Eternal', genero: 'Sci-Fi', duracion: '2h 32m', calificacion: 9.1, clasificacion: 'PG-13', director: 'Marco Silva', sinopsis: 'Una misión interestelar revela que el universo guarda secretos que podrían redefinir la existencia humana y el concepto mismo del tiempo.' },
    { id: 3, titulo: 'Río Sin Retorno', genero: 'Drama', duracion: '1h 55m', calificacion: 7.8, clasificacion: 'PG-13', director: 'Lucía Méndez', sinopsis: 'Dos hermanos separados por la guerra civil se reencuentran décadas después en las orillas del mismo río donde prometieron volver.' },
    { id: 4, titulo: 'El Último Acto', genero: 'Terror', duracion: '1h 48m', calificacion: 7.2, clasificacion: 'R', director: 'Carlos Vega', sinopsis: 'Una compañía de teatro ensaya la misma obra fatal cada noche en un teatro abandonado, sin recordar que ya lo han hecho antes.' },
    { id: 5, titulo: 'Noche Dorada', genero: 'Romance', duracion: '2h 01m', calificacion: 8.0, clasificacion: 'PG', director: 'Sofía Ruiz', sinopsis: 'En la ciudad más romántica del mundo, dos almas perdidas se encuentran durante una noche que ninguno olvidará jamás.' },
    { id: 6, titulo: 'Horizonte Rojo', genero: 'Acción', duracion: '2h 20m', calificacion: 7.5, clasificacion: 'PG-13', director: 'Jesús Mora', sinopsis: 'Un ex-soldado debe salvar a su ciudad natal de una conspiración que amenaza con borrarla del mapa antes del amanecer.' },
  ];

  // TODO: implementar
  filtrarPorGenero(genero: string): void {
    this.generoSeleccionado = genero;
  }

  verDetalle(pelicula: any): void {
    this.router.navigate(['/cartelera', pelicula.id]);
  }
}
