import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-funcion',
  templateUrl: './item-funcion.component.html',
  styleUrl: './item-funcion.component.css'
})
export class ItemFuncionComponent {

  @Input() funcion: any;
  @Input() activo: boolean = false;
  @Output() seleccionar = new EventEmitter<void>();

}
