import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'turnos', component: TurnosComponent },
  { path: 'tarjetas', component: TarjetaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
