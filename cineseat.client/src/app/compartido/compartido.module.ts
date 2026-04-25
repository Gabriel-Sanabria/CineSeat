import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviePosterComponent } from './movie-poster/movie-poster.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { BadgeComponent } from './badge/badge.component';
import { DividerComponent } from './divider/divider.component';
import { IconoComponent } from './icono/icono.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MoviePosterComponent,
    MovieCardComponent,
    BadgeComponent,
    DividerComponent,
    IconoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    MoviePosterComponent,
    MovieCardComponent,
    BadgeComponent,
    DividerComponent,
    IconoComponent
  ]
})
export class CompartidoModule { }
