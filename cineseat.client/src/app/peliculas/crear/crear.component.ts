import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GENEROS, SALAS, TIPOS_SALA, PRECIO_ENTRADA_DEFAULT } from '../../app.constants';
import { Funcion } from '../../models/funcion.model';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { FuncionService } from '../../services/funcion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {

  // Propiedad para controlar la creación o edición de una película
  modoEdicion: boolean = false;

  // Propiedad para controlar el estado de carga durante el guardado
  cargando: boolean = false;

  // Referencia al elemento de la lista de funciones
  @ViewChild('listaFunciones') listaFunciones!: ElementRef;

  // Propiedad para controlar el estado de arrastre de archivos para la portada
  arrastrando: boolean = false;

  // Propiedades para opciones de selección en el formulario (cargadas desde constantes)
  generos: string[] = GENEROS;
  salaOpciones: number[] = SALAS;
  tiposSala: string[] = TIPOS_SALA;

  // Objeto de la pelicula a crear/editar (inicialización con valores por defecto)
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

  // Inyección de dependencias del componente
  constructor(private router: Router, private ruta: ActivatedRoute, private toastr: ToastrService,
  private peliculaService: PeliculaService, private funcionService: FuncionService) { }

  ngOnInit(): void {
    // Detectar el modo edición si existe un parámetro 'id' en la ruta
    this.modoEdicion = !!this.ruta.snapshot.paramMap.get('id');
  }

  volver(): void {
    this.router.navigate(['/peliculas']);
  }

  guardar(): void {
    // Si se está en modo creación, llamar al método del servicio para crear una nueva película con los datos ingresados en el formulario
    if (!this.modoEdicion) {
      this.cargando = true;
      this.peliculaService.crear(this.pelicula).subscribe({
        next: (peliculaCreada) => {
          // Si la creación es exitosa, mostrar un mensaje de éxito y redirigir a la página de la lista de películas
          this.toastr.success('Película creada exitosamente.');
          this.router.navigate(['/peliculas']);
        },
        error: (errorHttp) => {
          // Si ocurre un error durante la creación, preparar un mensaje de advertencia
          let advertencia = 'Ocurrió un error al crear la película.';

          // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
          const cuerpo = errorHttp?.error;
          if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
          if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

          // Mostrar el mensaje de advertencia al usuario
          this.toastr.warning(advertencia);
          this.cargando = false;
        }
      });
    }
  }

  eliminarPelicula(): void {
    this.router.navigate(['/peliculas']);
  }

  agregarFuncion(): void {

    // Crear un nuevo objeto de función con valores por defecto y agregarlo a la lista de funciones de la película
    const nuevaFuncion: Funcion = {
      fecha: '',
      hora: '',
      sala: this.salaOpciones[0],
      tipo: this.tiposSala[0],
      precio: PRECIO_ENTRADA_DEFAULT
    };
    this.pelicula.funciones.push(nuevaFuncion);

    // Hacer scroll automático hacia la última función agregada
    setTimeout(() => {
      if (this.listaFunciones) {
        const el = this.listaFunciones.nativeElement;
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }, 0);
  }

  eliminarFuncion(indice: number): void {
    this.pelicula.funciones.splice(indice, 1);
  }

  alSoltarArchivo(event: DragEvent): void {
    // Evitar el comportamiento predeterminado del navegador al soltar un archivo (abrirlo) y actualizar la vista previa de la portada
    event.preventDefault();
    this.arrastrando = false;
    const archivo = event.dataTransfer?.files[0];

    // Leer el archivo como URL (para preview) y almacenar su contenido en base64 para enviarlo al servidor
    if (archivo && archivo.type.startsWith('image/')) {
      this.pelicula.urlPortada = URL.createObjectURL(archivo);
      const reader = new FileReader();
      reader.onload = () => {
        const resultado = reader.result as string;
        this.pelicula.portadaBase64 = resultado.split(',')[1];
        this.pelicula.mimePortada = archivo.type;
      };
      reader.readAsDataURL(archivo);
    }
  }

  alSeleccionarArchivo(event: Event): void {
    // Obtener el archivo seleccionado por el usuario para actualizar la vista previa de la portada
    const archivo = (event.target as HTMLInputElement).files?.[0];

    // Leer el archivo como URL (para preview) y almacenar su contenido en base64 para enviarlo al servidor
    if (archivo) {
      this.pelicula.urlPortada = URL.createObjectURL(archivo);
      const reader = new FileReader();
      reader.onload = () => {
        const resultado = reader.result as string;
        this.pelicula.portadaBase64 = resultado.split(',')[1];
        this.pelicula.mimePortada = archivo.type;
      };
      reader.readAsDataURL(archivo);
    }

    // Limpiar el valor para permitir seleccionar otros archivos
    (event.target as HTMLInputElement).value = '';
  }
}
