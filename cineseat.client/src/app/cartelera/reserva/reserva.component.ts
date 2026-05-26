import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcion } from '../../models/funcion.model';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { ReservaService } from '../../services/reserva.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent implements OnInit {

  // Configuración de asientos disponibles en la sala (10 filas x 10 columnas)
  filas: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  columnas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Estado del flujo de reserva
  reservaConfirmada: boolean = false;

  // Datos de la película, función y asientos seleccionados para la reserva
  pelicula: Pelicula = {
    id: 0,
    titulo: '',
    genero: '',
    clasificacion: '',
    duracionHoras: 0,
    duracionMinutos: 0,
    director: '',
    sinopsis: '',
    urlPortada: '',
    funciones: []
  };

  funcionActual: Funcion = {
    id: 0,
    fecha: '',
    hora: '',
    sala: 0,
    tipo: '',
    precio: 0
  };

  // Propiedades de control de asientos
  asientosSeleccionados: string[] = [];
  asientosOcupados: string[] = [];

  // Estado de carga de los asientos ocupados; evita que aparezcan de golpe en la grilla
  cargandoAsientos: boolean = true;

  // Datos del formulario de pago
  numeroTarjeta: string = '';
  vencimientoTarjeta: string = '';
  cvvTarjeta: string = '';

  // ID de la función leído de la ruta para usarlo al confirmar el pago
  private idFuncion: number = 0;

  // Getter de precio base por boleto según la función seleccionada
  get precioBoleto(): number { return this.funcionActual.precio || 0; }

  // Getter del cargo adicional del 10% sobre el subtotal de boletos
  get cargoServicio(): number { return Math.round(this.asientosSeleccionados.length * this.precioBoleto * 0.1); }

  // Getter del monto final que incluye boletos más cargo de servicio
  get total(): number { return this.asientosSeleccionados.length * this.precioBoleto + this.cargoServicio; }

  // Inyección de dependencias del componente
  constructor(private router: Router, private ruta: ActivatedRoute, private toastr: ToastrService,
  private peliculaService: PeliculaService, private reservaService: ReservaService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Obtener el ID de la película y función desde la ruta
    const idPelicula = Number(this.ruta.snapshot.paramMap.get('id'));
    this.idFuncion = Number(this.ruta.snapshot.paramMap.get('funcionId'));

    // Si no se encuentra el ID de película o función, o si no son números válidos, redirigir a la cartelera con una advertencia
    if (!idPelicula || !this.idFuncion || isNaN(idPelicula) || isNaN(this.idFuncion)) {
      this.toastr.warning('No se encontró la función seleccionada. Redirigiendo a la cartelera.');
      this.router.navigate(['/cartelera']);
      return;
    }

    // Cargar los datos de la película para mostrar el detalle y validar la función seleccionada
    this.peliculaService.obtenerPorId(idPelicula).subscribe({
      next: (pelicula) => {
        this.pelicula = pelicula;

        // Buscar la función correspondiente dentro de las funciones de la película
        const funcion = pelicula.funciones.find(f => f.id === this.idFuncion);
        if (funcion) {
          this.funcionActual = funcion;
        }
        // Si no se encuentra la función dentro de la película, redirigir a la cartelera con una advertencia
        else {
          this.toastr.warning('No se encontró la función seleccionada. Redirigiendo a la cartelera.');
          this.router.navigate(['/cartelera']);
          return;
        }

        // Cargar los asientos ocupados para la función seleccionada; si falla, se continúa sin bloquear la selección de asientos
        this.reservaService.obtenerAsientosOcupados(this.idFuncion).subscribe({
          next: (ocupados) => {
            this.asientosOcupados = ocupados;
            this.cargandoAsientos = false;
          },
          error: () => {
            // Si falla la carga de asientos ocupados se continúa sin bloquear; el backend revalidará al confirmar
            this.cargandoAsientos = false;
            this.toastr.warning('No se pudieron cargar los asientos ocupados. Algunos asientos pueden no estar disponibles.');
          }
        });
      },
      error: (errorHttp) => {
        // Si ocurre un error al cargar los datos de la película, preparar un mensaje de advertencia
        let advertencia = 'Ocurrió un error al cargar los datos de la película.';

        // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
        const cuerpo = errorHttp?.error;
        if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
        if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

        // Mostrar el mensaje de advertencia al usuario y navegar de vuelta a la página de la cartelera
        this.toastr.warning(advertencia);
        this.router.navigate(['/cartelera']);
      }
    });
  }

  pagar(): void {
    // Obtener los datos de sesión del usuario para asociar la reserva
    const sesion = this.usuarioService.obtenerDatosSesion();
    if (!sesion) {
      this.toastr.warning('Debes iniciar sesión para completar la reserva.');
      return;
    }

    // Calcular el subtotal de la reserva basado en la cantidad de asientos seleccionados y el precio por boleto
    const subtotal = this.asientosSeleccionados.length * this.precioBoleto;

    // Usar el servicio de reservas para crear una nueva reserva con los datos recopilados
    this.reservaService.crear({
      funcionId: this.idFuncion,
      usuarioId: sesion.id,
      asientos: this.asientosSeleccionados,
      subtotal: subtotal,
      cargoServicio: this.cargoServicio,
      total: this.total
    }, {
      numero: this.numeroTarjeta,
      vencimiento: this.vencimientoTarjeta,
      cvv: this.cvvTarjeta
    }).subscribe({
      next: () => {
        this.reservaConfirmada = true;
        this.toastr.success('Reserva completada con éxito.');
      },
      error: (errorHttp) => {
        // Preparar un mensaje de advertencia por defecto
        let advertencia = 'Ocurrió un error al procesar la reserva.';

        // Intentar extraer el mensaje de error devuelto por el servidor (error del model state o mensaje de error personalizado)
        const cuerpo = errorHttp?.error;
        if (cuerpo?.errors) advertencia = Object.values(cuerpo.errors).flat()[0] as string;
        if (cuerpo?.mensaje) advertencia = cuerpo.mensaje;

        // Mostrar el mensaje de advertencia al usuario
        this.toastr.warning(advertencia);
      }
    });
  }

  volverADetalle(): void {
    // Regresar a la página de detalle de la película actual (o a la de cartelera si no hubiera ID disponible)
    const idPelicula = this.ruta.snapshot.paramMap.get('id');
    if (idPelicula) {
      this.router.navigate(['/cartelera', idPelicula]);
    }
    else {
      this.router.navigate(['/cartelera']);
    }
  }

  volverACartelera(): void {
    // Navegar directamente a la cartelera después de generar el boleto de la reserva
    this.router.navigate(['/cartelera']);
  }

  estaOcupado(fila: string, col: number): boolean {
    // Verificar si el asiento ya fue reservado por otro usuario
    return this.asientosOcupados.includes(`${fila}${col}`);
  }

  estaSeleccionado(fila: string, col: number): boolean {
    // Verificar si el asiento fue elegido por el usuario en la sesión actual
    return this.asientosSeleccionados.includes(`${fila}${col}`);
  }

  toggleAsiento(fila: string, col: number): void {
    // Agregar o quitar el asiento de la selección, ignorando los ya ocupados
    const id = `${fila}${col}`;
    if (this.estaOcupado(fila, col)) return;
    const i = this.asientosSeleccionados.indexOf(id);
    if (i >= 0) {
      this.asientosSeleccionados.splice(i, 1);
    } else {
      this.asientosSeleccionados.push(id);
    }
  }

  soloDigitos(event: KeyboardEvent): void {
    // Bloquear cualquier tecla que no sea un dígito numérico
    if (!/\d/.test(event.key)) event.preventDefault();
  }

  formatearNumeroTarjeta(event: Event): void {
    // Agrupar los dígitos del número de tarjeta en bloques de 4 separados por espacios
    const input = event.target as HTMLInputElement;
    const digitos = input.value.replace(/\D/g, '').slice(0, 16);
    this.numeroTarjeta = digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  teclaVencimiento(event: KeyboardEvent): void {
    // Obtener los dígitos del campo de vencimiento para controlar la longitud y el formato
    const digitos = this.vencimientoTarjeta.replace(/\D/g, '');

    // Bloquear cualquier tecla que no sea dígito
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Bloquear al llegar a 4 dígitos (2 del mes + 2 del año)
    if (digitos.length >= 4) {
      event.preventDefault();
      return;
    }

    // Al completar el segundo dígito, agregar la barra inmediatamente después
    if (digitos.length === 1) {
      event.preventDefault();
      this.vencimientoTarjeta = digitos + event.key + '/';
    }
  }

  borrarVencimiento(event: KeyboardEvent): void {
    // Al borrar la barra, eliminar también el segundo dígito que la precede
    if (event.key === 'Backspace' && this.vencimientoTarjeta.endsWith('/')) {
      event.preventDefault();
      this.vencimientoTarjeta = this.vencimientoTarjeta.slice(0, -2);
    }
  }
}
