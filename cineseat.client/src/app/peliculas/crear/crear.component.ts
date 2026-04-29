import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {
  @ViewChild('listaFunciones') listaFunciones!: ElementRef;
  @ViewChild('inputArchivo') inputArchivo!: ElementRef;

  constructor(private router: Router, private ruta: ActivatedRoute) { }


  emailUsuario: string = '';
  modoEdicion: boolean = false;

  // Datos del formulario de la película
  pelicula: any = {
    titulo: '',
    genero: '',
    duracion: '',
    clasificacion: '',
    director: '',
    sinopsis: '',
    urlPortada: '',
    funciones: []
  };

  generos: string[] = ['Thriller', 'Sci-Fi', 'Drama', 'Terror', 'Romance', 'Acción', 'Comedia', 'Documental'];

  salaOpciones: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  tiposSala: { valor: string; etiqueta: string }[] = [
    { valor: '2D', etiqueta: '2D' },
    { valor: '3D', etiqueta: '3D' },
    { valor: 'IMAX', etiqueta: 'IMAX' },
    { valor: 'VIP', etiqueta: 'VIP' },
  ];

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
    this.pelicula.funciones.push({
      fecha: '',
      hora: '',
      sala: 1,
      tipo: '2D',
      precio: 90
    });

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
