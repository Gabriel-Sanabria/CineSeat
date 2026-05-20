import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { TITULO_APP } from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // Titulo de la aplicación a mostrar en el componente
  titulo = TITULO_APP;

  // Propiedad para indicar la opción activa del header
  @Input() activo: string = '';

  // Correo del usuario leído directamente del storage de sesión
  emailUsuario: string = '';

  // Controla la visibilidad del modal de confirmación
  mostrarModal: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    // Obtener los datos del usuario con la sesión activa y mostrar su correo en el header
    let datosSesion = this.usuarioService.obtenerDatosSesion();
    this.emailUsuario = datosSesion ? datosSesion.correo : '(No disponible)';
  }

  cerrarSesion(): void {
    // Mandar a cerrar la sesión al servicio y redirigir al usuario a la página de login
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
