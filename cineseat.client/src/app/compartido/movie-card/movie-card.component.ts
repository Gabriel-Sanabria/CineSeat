import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() pelicula: any = {};
  @Input() modo: 'ver' | 'editar' = 'ver';
  @Output() clickAccion = new EventEmitter<any>();

  // TODO: implementar
  accionClick(): void {
    this.clickAccion.emit(this.pelicula);
  }
}
