import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjeta-pelicula',
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.css'
})
export class TarjetaPeliculaComponent {
  @Input() pelicula: any = {};
  @Input() modo: 'ver' | 'editar' = 'ver';
  @Output() clickAccion = new EventEmitter<any>();

  // TODO: implementar
  accionClick(): void {
    this.clickAccion.emit(this.pelicula);
  }
}
