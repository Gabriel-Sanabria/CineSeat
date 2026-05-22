import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AutenticacionInterceptor } from './interceptors/autenticacion.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    CompartidoModule,
    ToastrModule.forRoot({ timeOut: 1500, positionClass: 'toast-bottom-right' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutenticacionInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
