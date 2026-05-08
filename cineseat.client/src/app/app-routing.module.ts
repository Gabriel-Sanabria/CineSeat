import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autenticacionGuard } from './guards/autenticacion.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(modulo => modulo.AutenticacionModule)
  },
  {
    path: 'cartelera',
    loadChildren: () => import('./cartelera/cartelera.module').then(modulo => modulo.CarteleraModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(modulo => modulo.PeliculasModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(modulo => modulo.DashboardModule),
    canActivate: [autenticacionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
