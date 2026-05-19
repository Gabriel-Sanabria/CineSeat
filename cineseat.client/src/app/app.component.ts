import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Definición del título de la app como constante exportable
export const TITULO_APP = 'CineSeat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Título de la aplicación a mostrar en el componente y en el título del navegador
  titulo = TITULO_APP;

  constructor(private title: Title) {
    // Obtener el título del navegador a través del servicio Title y establecerlo con el valor de la constante
    this.title.setTitle(TITULO_APP);
  }
}
