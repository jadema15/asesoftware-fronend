import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { ConsecutivoService } from 'src/app/services/consecutivo.service';
import { LoadingService } from 'src/app/services/loading.service';
import { QuorumService } from 'src/app/services/quorum.service';
import { TurnoService } from 'src/app/services/turno.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent {

  public fullName?: string;

  isLoading = true;
  hasError = false;
  hasDetalle = false;
  nombrePropietario: string = "";
  totalCoeficiente: number = 0;
  propiedades: any[] = [];
  public asistencia: number = 0.0;
  public idConsecutivo: number = 0;
  public consecutivo: boolean = false;
  verificacion: boolean = false;
  titulo!: string;

  beepOk = new Audio('assets/sound/beep.mp3');
  beepError = new Audio('assets/sound/error.mp3');
  beepWarnError = new Audio('assets/sound/error2.mp3');

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private readonly fb: FormBuilder, readonly turnoSerice: TurnoService, readonly quorumSerice: QuorumService, private readonly toastr: ToastrService, private readonly dialog: MatDialog, private readonly router: Router, private readonly asistenciaService: AsistenciaService, private readonly loadingService: LoadingService, private readonly consecutivoService: ConsecutivoService) {
    this.verificacion = Boolean(localStorage.getItem('verifacion'));
    this.titulo = "Verificación Quórum";
    this.cargarAsistencia();
    this.obtenerIdConsecutivoActivo();
  }

  public filtrosForm: FormGroup = this.fb.group({
    documento: [null, Validators.required]
  });

  lastScannedCode: string | null = null;

  onCodeScanned(code: string) {
    this.lastScannedCode = code; // Guardamos el valor
    const documentoReal = Number(this.lastScannedCode)/3;   
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
   // if (this.verificacion) {
      this.quorumSerice.postAsistencia(filtros).subscribe({
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
  /*  } else {
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
    }*/

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
    this.quorumSerice.getAsistenciaIncial().subscribe(asistencia => {
      this.asistencia = asistencia;
    })
  }

  obtenerIdConsecutivoActivo(): void {
    this.consecutivoService.getIdConsecutivo().subscribe(consecutivo => {
      this.idConsecutivo = consecutivo;
    })
  }
}