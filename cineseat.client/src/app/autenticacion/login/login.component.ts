import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Pestaña activa: 'login' o 'registro'
  tabActiva: string = 'login';

  // Datos del formulario de inicio de sesión
  correoLogin: string = '';
  contrasenaLogin: string = '';

  // Datos del formulario de registro
  correoRegistro: string = '';
  contrasenaRegistro: string = '';

  constructor(private router: Router) { }

  iniciarSesion(): void {
    this.router.navigate(['/cartelera']);
  }

  registrar(): void {
    this.router.navigate(['/cartelera']);
  }

  cambiarTab(tab: string): void {
    this.tabActiva = tab;
  }
}
