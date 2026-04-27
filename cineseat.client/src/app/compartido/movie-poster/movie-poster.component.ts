import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.css'
})
export class MoviePosterComponent {
  @Input() titulo: string = '';
  @Input() genero: string = '';
  @Input() ancho?: number;
  @Input() alto?: number;
}
