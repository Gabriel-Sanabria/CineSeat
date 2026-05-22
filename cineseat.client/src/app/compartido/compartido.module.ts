import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PortadaPeliculaComponent } from './portada-pelicula/portada-pelicula.component';
import { TarjetaPeliculaComponent } from './tarjeta-pelicula/tarjeta-pelicula.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ItemFuncionComponent } from './item-funcion/item-funcion.component';
import { FuncionEditableComponent } from './funcion-editable/funcion-editable.component';
import { GaleriaPeliculasComponent } from './galeria-peliculas/galeria-peliculas.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PortadaPeliculaComponent,
    TarjetaPeliculaComponent,
    BuscadorComponent,
    ItemFuncionComponent,
    FuncionEditableComponent,
    GaleriaPeliculasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    PortadaPeliculaComponent,
    TarjetaPeliculaComponent,
    BuscadorComponent,
    ItemFuncionComponent,
    FuncionEditableComponent,
    GaleriaPeliculasComponent
  ]
})
export class CompartidoModule { }
