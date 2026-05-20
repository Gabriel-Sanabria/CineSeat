import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GENEROS } from '../../app.constants';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit {

  // Emitidores de eventos para comunicar cambios en el texto de búsqueda y el género seleccionado
  @Output() textoCambia = new EventEmitter<string>();
  @Output() generoCambia = new EventEmitter<string>();

  // Propiedades de control del componente
  texto: string = '';
  generos: string[] = [];
  generoActivo: string = '';

  ngOnInit(): void {
    // Inicializar la lista de géneros con la opción "Todas" seguida de los géneros del archivo de constantes
    this.generos = ['Todas', ...GENEROS];
    this.generoActivo = this.generos[0];
  }

  alEscribir(): void {
    // Emitir el texto actualizado cada vez que el usuario escribe en el campo de búsqueda
    this.textoCambia.emit(this.texto);
  }

  seleccionarGenero(genero: string): void {
    // Actualizar el género activo y emitir el evento con el nuevo género seleccionado
    this.generoActivo = genero;
    this.generoCambia.emit(genero);
  }
}
