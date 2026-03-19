import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared-module';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';
import { SalidaComponent } from './components/salida/salida.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { MenuComponent } from './components/menu/menu.component';
import { VotacionComponent } from './components/votacion/votacion.component';
import { ConfirmEditComponent } from './shared/confirm-edit/confirm-edit.component';
import { ConfirmResultadoComponent } from './shared/confirm-resultado/confirm-resultado.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { PersonaComponent } from './components/persona/persona.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { MonitorPreguntaComponent } from './components/monitor-pregunta/monitor-pregunta.component';
import { ConfigService } from './services/config.service';
import { ConfirmEditPersonaComponent } from './shared/confirm-edit-persona/confirm-edit-persona.component';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurnosComponent,
    TarjetaComponent,
    ImagenComponent, SalidaComponent, PreguntaComponent, MenuComponent, VotacionComponent, ConfirmEditComponent, ConfirmResultadoComponent, ConfiguracionComponent, LoadingComponent, BarcodeScannerComponent, VerificacionComponent, PersonaComponent, AsistenciaComponent, MonitorPreguntaComponent, ConfirmEditPersonaComponent,

  ],
  imports: [
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
