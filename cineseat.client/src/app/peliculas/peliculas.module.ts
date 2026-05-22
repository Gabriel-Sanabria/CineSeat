import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { CrearComponent } from './crear/crear.component';
import { CompartidoModule } from '../compartido/compartido.module';

@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PeliculasRoutingModule,
    CompartidoModule
  ]
})
export class PeliculasModule { }
