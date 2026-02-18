import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public mostrarBoton: boolean = false;

  constructor(private readonly router: Router) { 

    const levelUser = localStorage.getItem('levelUser');
    const nivelUsuario = Number(levelUser);
  
    if(nivelUsuario==1){
      this.mostrarBoton = true;
    }
  }

  cambiar() {
    this.router.navigate(['/tarjetas']);
  }

  registrar() {
    this.router.navigate(['/turnos']);
  }

  preguntas() {
    this.router.navigate(['/pregunta']);
  }

  votacion() {
    this.router.navigate(['/votacion']);
  }

  configuracion() {
    this.router.navigate(['/configuracion']);
  }

  salir() {
    this.router.navigate(['/salida']);
  }

  verificacion(){
     localStorage.setItem('verifacion','true');
     this.router.navigate(['/verificacion']);
  }

  cerrarSesion() {
    localStorage.removeItem('logData');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
