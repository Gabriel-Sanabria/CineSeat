import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() activo: string = '';
  @Input() emailUsuario: string = '';

  constructor(private router: Router) { }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }
}
