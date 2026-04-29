import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-funcion-editable',
  templateUrl: './funcion-editable.component.html',
  styleUrl: './funcion-editable.component.css'
})
export class FuncionEditableComponent {

  @Input() funcion: any;
  @Input() indice: number = 0;
  @Input() tiposSala: { valor: string; etiqueta: string }[] = [];
  @Input() salaOpciones: number[] = [];
  @Output() eliminar = new EventEmitter<void>();

}
