import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITULO_APP } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Título de la aplicación a mostrar en el título del navegador
  titulo = TITULO_APP;

  constructor(private title: Title) {
    // Obtener el título del navegador a través del servicio Title y establecerlo con el titulo de la app
    this.title.setTitle(this.titulo);
  }
}
