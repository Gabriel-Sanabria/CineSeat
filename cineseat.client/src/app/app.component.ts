import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TITULO_APP } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {

  // Título de la aplicación a mostrar en el título del navegador
  titulo = TITULO_APP;

  // Controla si el header global debe mostrarse según la ruta activa
  mostrarHeader: boolean = false;

  // Opción activa en el header para resaltar la página actual
  opcionActiva: string = '';

  // Suscripción a los eventos de navegación para limpiar en ngOnDestroy
  private suscripcionRuta: Subscription;

  constructor(private title: Title, private router: Router) {
    // Obtener el título del navegador a través del servicio Title y establecerlo con el titulo de la app
    this.title.setTitle(this.titulo);

    // Suscribirse al cambio de rutas para actualizar la visibilidad del header y su opción activa
    this.suscripcionRuta = this.router.events
      .pipe(filter(evento => evento instanceof NavigationEnd))
      .subscribe((evento: NavigationEnd) => {
        const url = evento.urlAfterRedirects;
        this.mostrarHeader = !url.startsWith('/login');
        this.opcionActiva = url.split('/')[1] ?? '';
      });
  }

  ngOnDestroy(): void {
    this.suscripcionRuta.unsubscribe();
  }
}
