import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DatosTarjeta, Reserva, ReservaCrear } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  // URL base para las peticiones al backend relacionadas con reservas
  private readonly urlBase = '/api/reservas';

  // Inyección de dependencias del servicio
  constructor(private http: HttpClient) { }

  // GET /api/reservas/funcion/{funcionId}/asientos-ocupados
  obtenerAsientosOcupados(funcionId: number): Observable<string[]> {
    // Realizar la solicitud GET al backend para obtener los códigos de asiento ya ocupados de la función
    return this.http.get<string[]>(`${this.urlBase}/funcion/${funcionId}/asientos-ocupados`);
  }

  // POST /api/reservas
  crear(dto: ReservaCrear, tarjeta: DatosTarjeta): Observable<Reserva> {
    // Validación de los datos de la reserva y de la tarjeta antes de enviar la solicitud al backend
    const error = this.validarReserva(dto, tarjeta);
    if (error) {
      return throwError(() => ({ error: { mensaje: error } }));
    }
    // Realizar la solicitud POST al backend para crear la nueva reserva
    return this.http.post<Reserva>(this.urlBase, dto);
  }

  // --------- MÉTODOS AUXILIARES ---------

  private validarReserva(dto: ReservaCrear, tarjeta: DatosTarjeta): string | null {
    if (dto.asientos.length === 0) return 'Debes seleccionar al menos un asiento.';
    return this.validarDatosTarjeta(tarjeta);
  }

  private validarDatosTarjeta(tarjeta: DatosTarjeta): string | null {
    // El número de tarjeta debe tener exactamente 16 dígitos
    const digitosTarjeta = tarjeta.numero.replace(/\D/g, '');
    if (digitosTarjeta.length !== 16) return 'El número de tarjeta debe tener 16 dígitos.';

    // El vencimiento debe seguir el formato MM/AA con un mes válido
    const coincidencia = tarjeta.vencimiento.match(/^(\d{2})\/(\d{2})$/);
    if (!coincidencia) return 'La fecha de vencimiento debe tener el formato MM/AA.';

    const mes = Number(coincidencia[1]);
    const anio = Number(coincidencia[2]);
    if (mes < 1 || mes > 12) return 'El mes de vencimiento no es válido.';

    // El CVV debe tener exactamente 3 dígitos
    if (!/^\d{3}$/.test(tarjeta.cvv)) return 'El CVV debe tener 3 dígitos.';

    // El vencimiento no puede ser una fecha pasada
    const hoy = new Date();
    const anioActual = hoy.getFullYear() % 100;
    const mesActual = hoy.getMonth() + 1;
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) return 'La tarjeta está vencida.';

    return null;
  }
}
