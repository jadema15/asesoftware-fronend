import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';



import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SharedModule } from './shared/shared-module';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ImagenComponent } from './components/imagen/imagen.component';



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
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
