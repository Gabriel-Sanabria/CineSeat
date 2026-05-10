import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activo: string = '';
  @Input() emailUsuario: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
