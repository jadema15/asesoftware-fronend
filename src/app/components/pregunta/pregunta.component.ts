import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PreguntaDto } from 'src/app/models/PreguntaDto';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ConfirmEditComponent } from 'src/app/shared/confirm-edit/confirm-edit.component';
import { VotacionService } from 'src/app/services/votacion.service';
import { ConfirmResultadoComponent } from 'src/app/shared/confirm-resultado/confirm-resultado.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'pregunta', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<PreguntaDto>();

  public preguntas: PreguntaDto[] = [];
  coeficienteNo: number = 0.00;
  coeficienteSi: number = 0.00;
  textoPregunta: string = "";

 constructor(private readonly fb: FormBuilder, readonly votacionService: VotacionService, readonly preguntaService: PreguntaService, private readonly toastr: ToastrService, private readonly dialog: MatDialog, private readonly loadingService: LoadingService) { }

  ngOnInit(): void {
    // Cargar datos iniciales
    this.cargarAsistencia();
  }

  public filtrosForm: FormGroup = this.fb.group({
    pregunta: [null, Validators.required]
  });

  onGenerar() {
    if (this.filtrosForm.invalid) {
      this.filtrosForm.markAllAsTouched();
      return;
    }
    const filtros = this.filtrosForm.value;
    this.registrarSalidaAsistencia(filtros);
  }

  registrarSalidaAsistencia(filtros: any): void {
    this.loadingService.show();
    if (filtros.pregunta.length > 3) {
      this.preguntaService.postPregunta(filtros).subscribe({
        next: (respuesta: any) => {
          if (respuesta.id !== null) {
            this.mostrarMensajeExito("Pregunta registrada con éxito");
            this.cargarAsistencia();
            this.loadingService.hide();
          }
          this.borrarFormulario();
        },
        error: () => {
          this.loadingService.hide();
          this.mostrarMensajeError("Error desconocido");
        }
      });
    }
  }

  editarPregunta(id: number, filtros: any): void {
    this.loadingService.show();
    if (filtros.pregunta.length > 3) {
      this.preguntaService.putPregunta(id, filtros).subscribe({
        next: (respuesta: any) => {
          if (respuesta.id !== null) {
            this.mostrarMensajeExito("Pregunta Actualizada con éxito");
            this.cargarAsistencia();
            this.loadingService.hide();
          }
          this.borrarFormulario();
        },
        error: () => {
          this.loadingService.hide();
          this.mostrarMensajeError("Error desconocido");
        }
      });
    }
  }

  cargarAsistencia(): void {
    this.loadingService.show();
    this.preguntaService.getPreguntas().subscribe(preguntas => {
      this.dataSource.data = preguntas.sort((a, b) => a.id - b.id);
      this.dataSource.paginator = this.paginator;
      this.loadingService.hide();
    })
  }

  mostrarMensajeExito(mensaje: string) {
    this.toastr.success(mensaje, 'Éxito');
  }

  mostrarMensajeNoSePuedeEliminarError(mensaje: string) {
    this.toastr.warning(mensaje, 'Error');
  }

  borrarFormulario() {
    this.filtrosForm.reset();
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }

  seleccionarPregunta(p: any) {
    this.activarUnicaPregunta(p.id);
  }

  eliminarPregunta(id: number) {
    this.loadingService.show();
    this.preguntaService.eliminarPregunta(id).subscribe({
      next: (respuesta: any) => {
        if (respuesta) {
          this.mostrarMensajeExito("Pregunta eliminada por éxito");
          this.cargarAsistencia();
          this.loadingService.hide();
        } else {
          this.loadingService.hide();
          this.mostrarMensajeNoSePuedeEliminarError("La pregunta seleccionada no puede ser eliminada ya que tiene respuestas asociadas.");
        }
      },
      error: () => {
        this.loadingService.hide();
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }

  activarUnicaPregunta(id: number): void {
    this.loadingService.show();
    this.preguntaService.activarUnicaPregunta(id).subscribe({
      next: (respuesta: any) => {
        if (respuesta) {
          this.mostrarMensajeExito("Pregunta seleccionada con éxito");
          // this.websocketService.enviarCambioEstado(id);
          this.cargarAsistencia();
          this.loadingService.hide();
        }
      },
      error: () => {
        this.loadingService.hide();
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }

  modalEliminarPregunta(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar los turnos?',
        title: 'Confirmar eliminación'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.eliminarPregunta(id);
      }
    });
  }

  modalEditarPregunta(pregunta: any) {
    const dialogRef = this.dialog.open(ConfirmEditComponent, {
      width: '80vw',
      data: {
        title: 'Confirmar Editar Pregunta',
        pregunta: pregunta.pregunta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === true) {
        pregunta.pregunta = result.texto;
        this.editarPregunta(pregunta.id, pregunta);
      }
    });
  }

  modalRespuesta(pregunta: any) {
    this.respuestaVotacion(pregunta.id);
  }

  respuestaVotacion(id: number): void {
    this.loadingService.show();
    this.coeficienteNo = 0.00;
    this.coeficienteSi = 0.00;
    this.votacionService.respuestaVotacion(id).subscribe({
      next: (respuesta: any) => {
        this.coeficienteNo = respuesta.coeficienteNo;
        this.coeficienteSi = respuesta.coeficienteSi;
        this.textoPregunta = respuesta.pregunta.pregunta;
        this.loadingService.hide();
        const dialogRef = this.dialog.open(ConfirmResultadoComponent, {
          width: '50vw',
          data: {
            coeficienteNo: this.coeficienteNo,
            coeficienteSi: this.coeficienteSi,
            pregunta: this.textoPregunta
          }
        });

        dialogRef.afterClosed().subscribe(result => {
        });

      },
      error: () => {
        this.loadingService.hide();
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }
}
