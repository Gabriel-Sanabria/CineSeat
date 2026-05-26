// Modelos de datos para las métricas del dashboard
export interface DashboardFuncion {
  funcionId: number;
  fecha: string;
  hora: string;
  sala: number;
  tipo: string;
  boletos: number;
  porcentajeOcupacion: number;
  ingresosBrutos: number;
  cargoServicio: number;
  ingresosTotales: number;
}

export interface DashboardPelicula {
  peliculaId: number;
  titulo: string;
  genero: string;
  duracionHoras: number;
  duracionMinutos: number;
  funciones: DashboardFuncion[];
  totalBoletos: number;
  totalIngresosBrutos: number;
  totalCargoServicio: number;
  totalIngresosTotales: number;
}
