import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';



import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared-module';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurnosComponent,
    TarjetaComponent, 
    ImagenComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
