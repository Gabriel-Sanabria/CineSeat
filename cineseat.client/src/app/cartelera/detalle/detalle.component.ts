import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcion } from '../../models/funcion.model';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  // Objeto de la pelicula a mostrar (inicialización con valores por defecto)
  pelicula: Pelicula = {
    titulo: '',
    genero: '',
    clasificacion: '',
    duracionHoras: 0,
    duracionMinutos: 0,
    director: '',
    sinopsis: '',
    urlPortada: '',
    funciones: []
  };

  // Estado de carga mientras se espera la respuesta del servidor
  cargando: boolean = true;

  // Propiedades de control de estado de funciones
  fechaSeleccionada: string = '';
  funcionesFiltradas: Funcion[] = [];
  funcionSeleccionada: Funcion | null = null;

  // Inyección de dependencias del componente
  constructor(private router: Router, private ruta: ActivatedRoute, private toastr: ToastrService, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    // Cargar los datos de la película utilizando el ID proporcionado en el parámetro de la ruta
    const idPelicula = Number(this.ruta.snapshot.paramMap.get('id'));
    if (!isNaN(idPelicula) && idPelicula !== 0) {
      this.peliculaService.obtenerPorId(idPelicula).subscribe({
        next: (pelicula) => {
          this.pelicula = pelicula;
          this.filtrarFunciones(this.fechaSeleccionada);
          this.cargando = false;
        },
        error: (errorHttp) => {
          // Si ocurre un error al cargar los datos de la película, preparar un mensaje de advertencia
          let advertencia = 'Ocurrió un error al cargar los datos de la película.';

          // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
          const cuerpo = errorHttp?.error;
          if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
          if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

          // Mostrar el mensaje de advertencia al usuario y navegar de vuelta a la página de la cartelera
          this.toastr.warning(advertencia);
          this.router.navigate(['/cartelera']);
        }
      });
    }
    else {
      // Si no se proporciona un ID válido, navegar de vuelta a la cartelera
      this.toastr.warning('No se encontró la película. Redirigiendo a la cartelera.', 'Película no encontrada');
      this.router.navigate(['/cartelera']);
    }
  }

  volver(): void {
    // Navegar de vuelta a la página de la cartelera
    this.router.navigate(['/cartelera']);
  }

  irAReserva(): void {
    // Navegar a la página de reserva para la función seleccionada de la película actual
    this.router.navigate(['/cartelera', this.pelicula.id, 'reserva', this.funcionSeleccionada?.id]);
  }

  filtrarFunciones(fecha: string): void {
    // Actualizar la fecha seleccionada y deseleccionar la función activa al cambiar el filtro
    this.fechaSeleccionada = fecha;
    this.funcionSeleccionada = null;

    // Mostrar todas las funciones si no hay fecha seleccionada, o solo las del día indicado
    this.funcionesFiltradas = !fecha ? this.pelicula.funciones : this.pelicula.funciones.filter(f => f.fecha === fecha);
  }
}
