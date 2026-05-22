import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, retry } from 'rxjs/operators';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

type ContextoGaleria = 'cartelera' | 'peliculas';

@Component({
  selector: 'app-galeria-peliculas',
  templateUrl: './galeria-peliculas.component.html',
  styleUrl: './galeria-peliculas.component.css'
})
export class GaleriaPeliculasComponent implements OnInit {

  // Contexto en el que se muestra la galería: 'cartelera' para consulta de funciones, 'peliculas' para gestión del catálogo
  contexto: ContextoGaleria = 'cartelera';

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
  constructor(private router: Router, private ruta: ActivatedRoute, private toastr: ToastrService, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    // Leer el contexto desde la configuración de la ruta para configurar el título, botones y navegación
    this.contexto = this.ruta.snapshot.data['contexto'] ?? 'cartelera';

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
          // Si ocurre un error durante la carga, preparar un mensaje de advertencia según el contexto
          let advertencia = this.contexto === 'cartelera' ? 'Ocurrió un error al cargar la cartelera.' : 'Ocurrió un error al cargar las películas.';

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

  alClickTarjeta(pelicula: Pelicula): void {
    // Navegar según el contexto: ver detalle en cartelera o editar en gestión de películas
    if (this.contexto === 'cartelera') {
      this.router.navigate(['/cartelera', pelicula.id]);
    } else {
      this.router.navigate(['/peliculas/editar', pelicula.id]);
    }
  }

  nuevaPelicula(): void {
    // Navegar a la página de creación de película (solo disponible en el contexto 'peliculas')
    this.router.navigate(['/peliculas/crear']);
  }
}
