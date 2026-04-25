import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icono',
  templateUrl: './icono.component.html',
  styleUrl: './icono.component.css'
})
export class IconoComponent {
  @Input() nombre: string = '';
  @Input() tamano: number = 24;
}
