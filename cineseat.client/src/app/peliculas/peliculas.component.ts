import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, retry } from 'rxjs/operators';
import { Pelicula } from '../models/pelicula.model';
import { ToastrService } from 'ngx-toastr';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {

  // Propiedades para controlar el estado de búsqueda y filtrado
  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';

  // Lista completa de películas obtenida del servidor
  peliculas: Pelicula[] = [];

  // Lista de películas filtradas según el género seleccionado
  peliculasMostradas: Pelicula[] = [];

  // Estado de carga mientras se espera la respuesta del servidor
  cargando: boolean = true;

  // Inyección de dependencias del componente
  constructor(private router: Router, private toastr: ToastrService, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    // Cargar la lista completa de películas al inicializar el componente
    this.peliculaService.obtenerTodas()
      .pipe(retry({ count: 3, delay: 1000 }), finalize(() => this.cargando = false))
      .subscribe({
        next: (peliculas) => {
          // Asignar la lista de películas obtenida del servidor a la propiedad 'peliculas'
          this.peliculas = peliculas ?? [];

          // Inicializar la lista de películas mostradas con todas las películas
          this.aplicarFiltros(this.generoSeleccionado, this.textoBusqueda);
        },
        error: (errorHttp) => {
          // Si ocurre un error durante la creación, preparar un mensaje de advertencia
          let advertencia = 'Ocurrió un error al cargar las películas.';

          // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
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

  nuevaPelicula(): void {
    // Navegar a la página de creación de película para ingresar los datos de una nueva película
    this.router.navigate(['/peliculas/crear']);
  }

  editarPelicula(pelicula: Pelicula): void {
    // Navegar a la página de edición de película pasando el id de la película para cargar sus datos
    this.router.navigate(['/peliculas/editar', pelicula.id]);
  }
}
