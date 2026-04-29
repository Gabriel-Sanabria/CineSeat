import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activo: string = '';
  @Input() emailUsuario: string = '';

  constructor(private router: Router) { }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }
}
