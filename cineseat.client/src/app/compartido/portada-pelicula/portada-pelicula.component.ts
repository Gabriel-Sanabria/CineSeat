import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portada-pelicula',
  templateUrl: './portada-pelicula.component.html',
  styleUrl: './portada-pelicula.component.css'
})
export class PortadaPeliculaComponent {
  @Input() titulo: string = '';
  @Input() genero: string = '';
  @Input() ancho?: number;
  @Input() alto?: number;
}
