import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-tarjeta-pelicula',
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.css'
})
export class TarjetaPeliculaComponent {
  @Input() pelicula!: Pelicula;
  @Input() modo: 'ver' | 'editar' = 'ver';
  @Output() clickAccion = new EventEmitter<Pelicula>();

  // TODO: implementar
  accionClick(): void {
    this.clickAccion.emit(this.pelicula);
  }
}
