import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {
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
    funciones: []
  };

  generos: string[] = ['Thriller', 'Sci-Fi', 'Drama', 'Terror', 'Romance', 'Acción', 'Comedia', 'Documental'];

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

  // TODO: implementar
  subirArchivo(): void { }

  // TODO: implementar
  agregarFuncion(): void {
    this.pelicula.funciones.push({
      fecha: '',
      hora: '',
      tipo: '2D',
      precio: 90
    });
  }

  // TODO: implementar
  eliminarFuncion(indice: number): void {
    this.pelicula.funciones.splice(indice, 1);
  }
}
