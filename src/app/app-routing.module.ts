import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { authGuard } from './services/auth.guard';
import { SalidaComponent } from './components/salida/salida.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { VotacionComponent } from './components/votacion/votacion.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { noAuthGuard } from './services/no-auth.guard';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { PersonaComponent } from './components/persona/persona.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [noAuthGuard] },
  {
    path: '',
    canActivateChild: [authGuard], // 🔒 aplica el guard a todas las hijas
    children: [
      { path: 'turnos', component: TurnosComponent },
      { path: 'tarjetas', component: TarjetaComponent },
      { path: 'salida', component: SalidaComponent },
      { path: 'votacion', component: VotacionComponent },
      { path: 'pregunta', component: PreguntaComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'verificacion', component: VerificacionComponent },
      { path: 'persona', component: PersonaComponent },
      { path: 'asistencia', component: AsistenciaComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }