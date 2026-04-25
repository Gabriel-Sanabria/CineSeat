import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { CarteleraComponent } from './cartelera.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CompartidoModule } from '../compartido/compartido.module';

@NgModule({
  declarations: [
    CarteleraComponent,
    DetalleComponent,
    ReservaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarteleraRoutingModule,
    CompartidoModule
  ]
})
export class CarteleraModule { }
