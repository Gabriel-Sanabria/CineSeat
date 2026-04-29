import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './login/login.component';
import { CompartidoModule } from '../compartido/compartido.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutenticacionRoutingModule,
    CompartidoModule
  ]
})
export class AutenticacionModule { }
