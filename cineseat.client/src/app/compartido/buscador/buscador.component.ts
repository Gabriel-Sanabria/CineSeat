import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnChanges {

  @Input() generos: string[] = [];
  @Input() placeholder: string = 'Buscar...';

  @Output() textoCambia = new EventEmitter<string>();
  @Output() generoCambia = new EventEmitter<string>();

  // Estado interno del componente
  texto: string = '';
  generoActivo: string = '';

  ngOnChanges(cambios: SimpleChanges): void {
    // Al recibir la lista de géneros por primera vez, activar el primero
    if (cambios['generos'] && this.generos.length > 0 && !this.generoActivo) {
      this.generoActivo = this.generos[0];
    }
  }

  alEscribir(): void {
    this.textoCambia.emit(this.texto);
  }

  seleccionarGenero(genero: string): void {
    this.generoActivo = genero;
    this.generoCambia.emit(genero);
  }
}
