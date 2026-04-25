import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculasComponent } from './peliculas.component';
import { CrearComponent } from './crear/crear.component';
import { CompartidoModule } from '../compartido/compartido.module';

@NgModule({
  declarations: [
    PeliculasComponent,
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
