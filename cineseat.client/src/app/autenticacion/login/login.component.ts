import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioActual } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

type TabAutenticacion = 'login' | 'registro';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // Propiedad de tab
  tabActiva: TabAutenticacion = 'login';

  // Propiedades para login
  correoLogin: string = '';
  contrasenaLogin: string = '';
  sesionMantenida: boolean = false;

  // Propiedades para registro
  correoRegistro: string = '';
  contrasenaRegistro: string = '';

  // Visibilidad de contraseña
  mostrarContrasenaLogin: boolean = false;
  mostrarContrasenaRegistro: boolean = false;

  // Estado de carga
  cargando: boolean = false;

  // Inyección de dependencias del componente
  constructor(private router: Router, private toastr: ToastrService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Si al cargar el componente se detecta que ya existe una sesión activa, se redirige al usuario a la página de cartelera directamente.
    if (this.usuarioService.haySesionActiva()) {
      this.router.navigate(['/cartelera']);
      return;
    }

    // Si se detecta que se llegó a la página de login por una sesión expirada, se muestra un mensaje de advertencia al usuario.
    if (history.state?.sesionExpirada) {
      this.toastr.warning('Tu sesión ha expirado.');
    }
  }

  cambiarTab(tab: TabAutenticacion): void {
    this.tabActiva = tab;
  }

  iniciarSesion(): void {
    // Llamar al método del servicio para validar las credenciales del usuario
    this.cargando = true;
    this.usuarioService.validarCredenciales(this.correoLogin, this.contrasenaLogin, this.sesionMantenida).subscribe({
      next: (respuesta: UsuarioActual) => {
        // Si las credenciales son válidas, iniciar la sesión, mostrar un mensaje de éxito y redirigir al usuario
        this.usuarioService.guardarSesion(respuesta.id, this.sesionMantenida);
        this.cargando = false;
        this.toastr.success('Inicio de sesión exitoso.');
        this.router.navigate(['/cartelera']);
      },
      error: (errorHttp) => {
        // Si ocurre un error durante la validación, preparar un mensaje de advertencia
        let advertencia = 'Ocurrió un error al iniciar sesión.';

        // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
        const cuerpo = errorHttp?.error;
        if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
        if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

        // Mostrar el mensaje de advertencia al usuario
        this.toastr.warning(advertencia);
        this.cargando = false;
      }
    });
  }

  registrar(): void {
    // Llamar al método del servicio para crear un nuevo usuario
    this.cargando = true;
    this.usuarioService.crear({ correo: this.correoRegistro, contrasena: this.contrasenaRegistro }).subscribe({
      next: (respuesta: UsuarioActual) => {
        // Si el registro es exitoso, iniciar la sesión, mostrar un mensaje de éxito y redirigir al usuario a la página de cartelera
        this.usuarioService.guardarSesion(respuesta.id);
        this.cargando = false;
        this.toastr.success('Usuario registrado exitosamente.');
        this.router.navigate(['/cartelera']);
      },
      error: (errorHttp) => {
        // Si ocurre un error durante el registro, preparar un mensaje de advertencia
        let advertencia = 'Ocurrió un error al registrar el usuario.';

        // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
        const cuerpo = errorHttp?.error;
        if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
        if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

        // Mostrar el mensaje de advertencia al usuario
        this.toastr.warning(advertencia);
        this.cargando = false;
      }
    });
  }
}
