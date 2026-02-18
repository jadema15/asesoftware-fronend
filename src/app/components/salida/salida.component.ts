import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent {

  constructor(private readonly fb: FormBuilder, readonly turnoSerice: TurnoService, private readonly toastr: ToastrService, private readonly router: Router, private readonly loadingService: LoadingService) { }

  lastScannedCode: string | null = null;
  beepOk = new Audio('assets/sound/beep.mp3');
  beepError = new Audio('assets/sound/error.mp3');
  beepWarnError = new Audio('assets/sound/error2.mp3');

  public filtrosForm: FormGroup = this.fb.group({
    documento: [null, Validators.required]
  });

  onCodeScanned(code: string) {
    this.lastScannedCode = code; // Guardamos el valor   
    const documentoReal = Number(this.lastScannedCode)/3;
    this.filtrosForm.controls['documento'].setValue(documentoReal);
    const filtros = this.filtrosForm.value;

    this.registrarSalidaAsistencia(filtros);
  }

  onGenerar() {
    if (this.filtrosForm.invalid) {
      this.filtrosForm.markAllAsTouched();
      return;
    }
    const filtros = this.filtrosForm.value;
    this.registrarSalidaAsistencia(filtros);
  }

  mostrarMensajeExito() {
    const documento = this.filtrosForm.get("documento")?.value;
    this.toastr.success(`Salida registrada con éxito para el documento ${documento}`, 'Éxito');
  }

  borrarFormulario() {
    this.filtrosForm.reset();
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }

  mostrarMensajeInformacion() {
    const documento = this.filtrosForm.get("documento")?.value;
    this.toastr.info(`El documento ${documento} NO esta registrado dentro de los asistentes en la Asamblea`, 'Información');
  }

  registrarSalidaAsistencia(filtros: any): void {
    this.loadingService.show();
    this.turnoSerice.putAsistencia(filtros).subscribe({
      next: (respuesta: any) => {
        if (respuesta.estado == "inactivo") {
          this.mostrarMensajeExito();
          this.beepOk.play();
        } else if (respuesta.estado === null) {
          this.mostrarMensajeInformacion();
          this.beepError.play();
        }
        this.borrarFormulario();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }
}