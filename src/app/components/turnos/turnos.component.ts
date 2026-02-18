import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { QuorumService } from 'src/app/services/quorum.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  public fullName?: string;

  isLoading = true;
  hasError = false;
  hasDetalle = false;
  nombrePropietario: string = "";
  totalCoeficiente: number = 0;
  propiedades: any[] = [];
  public asistencia: number = 0.0;
  verificacion: boolean = false;
  titulo!: string;

  beepOk = new Audio('assets/sound/beep.mp3');
  beepError = new Audio('assets/sound/error.mp3');
  beepWarnError = new Audio('assets/sound/error2.mp3');

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private readonly fb: FormBuilder, readonly turnoSerice: TurnoService, readonly quorumSerice: QuorumService, private readonly toastr: ToastrService, private readonly dialog: MatDialog, private readonly router: Router, private readonly asistenciaService: AsistenciaService, private readonly loadingService: LoadingService) {
    this.verificacion = Boolean(localStorage.getItem('verifacion'));
    this.titulo = "Registro de asistencia asamblea";
  }

  public filtrosForm: FormGroup = this.fb.group({
    documento: [null, Validators.required]
  });

  lastScannedCode: string | null = null;

  onCodeScanned(code: string) {
    this.lastScannedCode = code; // Guardamos el valor
    const documentoReal = Number(this.lastScannedCode)/3;
    console.log("documento real" , documentoReal);
    this.filtrosForm.controls['documento'].setValue(documentoReal);
    const filtros = this.filtrosForm.value;

    this.registrarAsistencia(filtros);

  }

  onGenerar() {
    if (this.filtrosForm.invalid) {
      this.filtrosForm.markAllAsTouched();
      return;
    }
    const filtros = this.filtrosForm.value;

    this.registrarAsistencia(filtros);
  }


  registrarAsistencia(filtros: any): void {
    this.loadingService.show();
    this.hasDetalle = false;
      this.turnoSerice.postAsistencia(filtros).subscribe({
        next: (respuesta: any) => {
          this.totalCoeficiente = respuesta.totalCoeficiente;
          if (respuesta.estadoMensaje == 0) {
            this.cargarAsistencia();
            this.mostrarMensajeExito();
            this.hasDetalle = true;
            this.mostrarDetalle(respuesta!.personaDto);
            this.beepOk.play();
          } else if (respuesta.estadoMensaje == 1) {
            this.mostrarMensajeInformacion(respuesta.mensaje, "Información");
            this.beepWarnError.play();
          } else {
            this.mostrarMensajeAdvertencia(respuesta.mensaje, "Advertencia");
            this.beepError.play();
          }
          this.loadingService.hide();
          this.borrarFormulario();
        },
        error: () => {
          this.mostrarMensajeError("Error desconocido");
          this.loadingService.hide();
        }
      });    
  }

  mostrarDetalle(personaDtoList: any[]) {
    this.nombrePropietario = personaDtoList[0].primerNombre + " " + personaDtoList[0].primerApellido;
    this.propiedades = personaDtoList;
    this.nombrePropietario = this.nombrePropietario.toUpperCase();
  }

  borrarFormulario() {
    this.filtrosForm.reset();
  }

  mostrarMensajeExito() {
    this.toastr.success('Asistencia registrada exitosamente', 'Éxito');
  }

  modalEliminarTurno() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar los turnos?',
        title: 'Confirmar eliminación'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }

  mostrarMensajeAdvertencia(mensaje: string, titulo: string) {
    this.toastr.warning(mensaje, titulo);
  }

  mostrarMensajeInformacion(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo);
  }

  getToUpperCase(text: string): string {
    return text.toUpperCase();
  }

  cargarAsistencia(): void {
    this.asistenciaService.getAsistenciaIncial().subscribe(asistencia => {
      this.asistencia = asistencia;
    })
  }
}