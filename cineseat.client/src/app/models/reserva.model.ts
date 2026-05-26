// Modelos de datos para la generación de reservas y pagos
export interface DatosTarjeta {
  numero: string;
  vencimiento: string;
  cvv: string;
}

export interface ReservaCrear {
  funcionId: number;
  usuarioId: number;
  asientos: string[];
  subtotal: number;
  cargoServicio: number;
  total: number;
}

export interface Reserva {
  id: number;
  funcionId: number;
  usuarioId: number;
  fechaCreacion: string;
  asientos: string[];
  pago: PagoResumen;
}

export interface PagoResumen {
  id: number;
  subtotal: number;
  cargoServicio: number;
  total: number;
  fecha: string;
}
