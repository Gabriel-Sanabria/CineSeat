import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, retry } from 'rxjs/operators';
import { Pelicula } from '../models/pelicula.model';
import { ToastrService } from 'ngx-toastr';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.css'
})
export class CarteleraComponent implements OnInit {

  // Propiedades para controlar el estado de búsqueda y filtrado
  textoBusqueda: string = '';
  generoSeleccionado: string = 'Todas';

  // Lista completa de películas obtenida del servidor
  peliculas: Pelicula[] = [];

  // Lista de películas filtradas según el género y texto de búsqueda activos
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
          // Si ocurre un error durante la carga, preparar un mensaje de advertencia
          let advertencia = 'Ocurrió un error al cargar la cartelera.';

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

  verDetalle(pelicula: Pelicula): void {
    // Navegar a la página de detalle de la película pasando su id para cargar sus datos
    this.router.navigate(['/cartelera', pelicula.id]);
  }
}
