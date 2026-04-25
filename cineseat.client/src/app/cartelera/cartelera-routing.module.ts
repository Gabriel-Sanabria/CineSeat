import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteleraComponent } from './cartelera.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [
  { path: '', component: CarteleraComponent },
  { path: ':id', component: DetalleComponent },
  { path: ':id/reserva/:funcionId', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteleraRoutingModule { }
