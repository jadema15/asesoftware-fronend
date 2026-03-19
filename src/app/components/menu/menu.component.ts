import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public mostrarBoton: boolean = false;

  constructor(private readonly router: Router, private readonly dialog: MatDialog) {

    const levelUser = localStorage.getItem('levelUser');
    const nivelUsuario = Number(levelUser);
    console.log("levle", nivelUsuario);

    if (nivelUsuario == 1) {
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

  verificacion() {
    localStorage.setItem('verifacion', 'true');
    this.router.navigate(['/verificacion']);
  }

  cerrarSesion() {

    localStorage.removeItem('logData');
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }

  modalEliminarPregunta() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Realmente desea cerrar su sesión?',
        title: 'Cerrar Sesión'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cerrarSesion();
      }
    });
  }
}
