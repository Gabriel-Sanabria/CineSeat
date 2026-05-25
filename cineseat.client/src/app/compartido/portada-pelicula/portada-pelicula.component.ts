import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portada-pelicula',
  templateUrl: './portada-pelicula.component.html',
  styleUrl: './portada-pelicula.component.css'
})
export class PortadaPeliculaComponent {
  @Input({ required: true }) titulo: string = '';
  @Input({ required: true }) genero: string = '';
  @Input() ancho?: number;
  @Input() alto?: number;
  @Input() portada?: string;
}
