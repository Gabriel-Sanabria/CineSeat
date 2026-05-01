import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(modulo => modulo.AutenticacionModule)
  },
  {
    path: 'cartelera',
    loadChildren: () => import('./cartelera/cartelera.module').then(modulo => modulo.CarteleraModule)
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(modulo => modulo.PeliculasModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(modulo => modulo.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
