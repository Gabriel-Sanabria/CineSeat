import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaPeliculasComponent } from '../compartido/galeria-peliculas/galeria-peliculas.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
  { path: '', component: GaleriaPeliculasComponent, data: { contexto: 'peliculas' } },
  { path: 'crear', component: CrearComponent },
  { path: 'editar/:id', component: CrearComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
