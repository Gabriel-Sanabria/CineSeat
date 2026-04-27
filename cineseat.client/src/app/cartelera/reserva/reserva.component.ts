import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  emailUsuario: string = '';
  reservaConfirmada: boolean = false;

  // Datos de pago del formulario
  numeroTarjeta: string = '';
  vencimientoTarjeta: string = '';
  cvvTarjeta: string = '';

  // Datos de ejemplo para visualizar mientras se desarrolla la lógica:
  pelicula: any = { titulo: 'La Sombra del Tiempo' };
  funcion: any = { hora: '19:30', sala: 'Sala 3', tipo: '2D', precio: 90 };
  asientosSeleccionados: string[] = [];
  filas: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  columnas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Simulación de asientos ocupados
  asientosOcupados: string[] = ['B3', 'B4', 'C5', 'C6', 'D7', 'E2', 'F8'];

  constructor(private router: Router, private ruta: ActivatedRoute) { }

  get precioBoleto(): number {
    return this.funcion?.precio || 0;
  }

  get cargoServicio(): number {
    return Math.round(this.asientosSeleccionados.length * this.precioBoleto * 0.1);
  }

  get total(): number {
    return this.asientosSeleccionados.length * this.precioBoleto + this.cargoServicio;
  }

  estaOcupado(fila: string, col: number): boolean {
    return this.asientosOcupados.includes(`${fila}${col}`);
  }

  estaSeleccionado(fila: string, col: number): boolean {
    return this.asientosSeleccionados.includes(`${fila}${col}`);
  }

  toggleAsiento(fila: string, col: number): void {
    const id = `${fila}${col}`;
    if (this.estaOcupado(fila, col)) return;
    const i = this.asientosSeleccionados.indexOf(id);
    if (i >= 0) {
      this.asientosSeleccionados.splice(i, 1);
    } else {
      this.asientosSeleccionados.push(id);
    }
  }

  pagar(): void {
    this.reservaConfirmada = true;
  }

  volverACartelera(): void {
    this.router.navigate(['/cartelera']);
  }

  nuevaReserva(): void {
    this.router.navigate(['/cartelera']);
  }

  volver(): void {
    const idPelicula = this.ruta.snapshot.paramMap.get('id');
    if (idPelicula) {
      this.router.navigate(['/cartelera', idPelicula]);
    } else {
      this.router.navigate(['/cartelera']);
    }
  }
}
