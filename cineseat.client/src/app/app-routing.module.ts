import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/cartelera', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
  },
  {
    path: 'cartelera',
    loadChildren: () => import('./cartelera/cartelera.module').then(m => m.CarteleraModule)
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
