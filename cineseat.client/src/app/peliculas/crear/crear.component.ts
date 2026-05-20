import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GENEROS, SALAS, TIPOS_SALA, PRECIO_ENTRADA_DEFAULT } from '../../app.constants';
import { Funcion, Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {

  // Propiedad para controlar la creación o edición de una película
  modoEdicion: boolean = false;

  // Referencias a elementos del DOM para manipulación directa
  @ViewChild('listaFunciones') listaFunciones!: ElementRef;
  @ViewChild('inputArchivo') inputArchivo!: ElementRef;

  // Propiedades para opciones de selección en el formulario (cargadas desde constantes)
  generos: string[] = GENEROS;
  salaOpciones: number[] = SALAS;
  tiposSala: string[] = TIPOS_SALA;

  // Objeto de la pelicula a crear/editar (inicialización con valores por defecto)
  pelicula: Pelicula = {
    titulo: '',
    genero: '',
    clasificacion: '',
    director: '',
    sinopsis: '',
    duracionHoras: 0,
    duracionMinutos: 0,
    urlPortada: '',
    funciones: []
  };

  // Inyección de dependencias del componente
  constructor(private router: Router, private ruta: ActivatedRoute, private peliculaService: PeliculaService) { }

  // TODO: implementar — cargar pelicula si modoEdicion
  ngOnInit(): void {
    this.modoEdicion = !!this.ruta.snapshot.paramMap.get('id');
  }

  volver(): void {
    this.router.navigate(['/peliculas']);
  }

  cancelar(): void {
    this.router.navigate(['/peliculas']);
  }

  guardar(): void {
    this.router.navigate(['/peliculas']);
  }

  eliminarPelicula(): void {
    this.router.navigate(['/peliculas']);
  }

  subirArchivo(): void {
    this.inputArchivo.nativeElement.click();
  }

  alSeleccionarArchivo(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      this.pelicula.urlPortada = URL.createObjectURL(archivo);
    }
    // Limpiar el valor para permitir seleccionar el mismo archivo de nuevo
    (event.target as HTMLInputElement).value = '';
  }

  // TODO: implementar
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

  // TODO: implementar
  eliminarFuncion(indice: number): void {
    this.pelicula.funciones.splice(indice, 1);
  }
}
