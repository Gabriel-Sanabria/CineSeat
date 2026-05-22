import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaPeliculasComponent } from '../compartido/galeria-peliculas/galeria-peliculas.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [
  { path: '', component: GaleriaPeliculasComponent, data: { contexto: 'cartelera' } },
  { path: ':id', component: DetalleComponent },
  { path: ':id/reserva/:funcionId', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteleraRoutingModule { }
