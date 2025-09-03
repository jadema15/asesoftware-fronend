import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard], // Protege las rutas hijas
    children: [
      { path: 'turnos', component: TurnosComponent },
      { path: 'tarjetas', component: TarjetaComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
