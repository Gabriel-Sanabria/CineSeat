import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicio } from '../../services/sesion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activo: string = '';
  @Input() emailUsuario: string = '';

  constructor(private router: Router, private sesionServicio: SesionServicio) { }

  cerrarSesion(): void {
    this.sesionServicio.cerrar();
    this.router.navigate(['/login']);
  }
}
