import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AutenticacionInterceptor } from './interceptors/autenticacion.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({ timeOut: 1500, positionClass: 'toast-bottom-right' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutenticacionInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
