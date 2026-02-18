import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { VotacionService } from 'src/app/services/votacion.service';

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, readonly votacionService: VotacionService, private readonly toastr: ToastrService, readonly preguntaService: PreguntaService, private readonly loadignService: LoadingService) { }

  public pregunta: string = "";
  coeficienteNo: number = 0.00;
  coeficienteSi: number = 0.00
  mostrarBotonSi: boolean = true;
  mostrarBotonNo: boolean = true;
  mostrarRespuestas: boolean = false;

  lastScannedCode: string | null = null;
  beepOk = new Audio('assets/sound/beep.mp3');
  beepError = new Audio('assets/sound/error.mp3');
  beepWarnError = new Audio('assets/sound/error2.mp3');

  ngOnInit(): void {
    this.obtenerPreguntaActiva();
  }

  public filtrosForm: FormGroup = this.fb.group({
    documento: [null, Validators.required,]
  });

  sinEspaciosValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value || '';
    return valor.trim().length === 0 ? { sinEspacios: true } : null;
  }

  onCodeScanned(code: string) {
    this.lastScannedCode = code; // Guardamos el valor
    const documentoReal = Number(this.lastScannedCode)/3;   
    this.filtrosForm.controls['documento'].setValue(documentoReal);
    const filtros = this.filtrosForm.value;

    this.registrarVoto(filtros);
  }

  onGenerar() {
    if (this.filtrosForm.invalid) {
      this.filtrosForm.markAllAsTouched();
      return;
    }
    const filtros = this.filtrosForm.value;
    this.registrarVoto(filtros);
  }


  registrarVoto(filtros: any): void {
    this.loadignService.show()
    filtros.voto = localStorage.getItem("voto");
    filtros.preguntaId = localStorage.getItem("preguntaId");
    filtros.documento = filtros.documento
    const valor = localStorage.getItem("voto");
    if (valor !== null) {
      const validarDocumento = filtros.documento;

      if (validarDocumento && validarDocumento !== "") {
        this.votacionService.postVotacion(filtros).subscribe({
          next: (respuesta: any) => {
            if (respuesta.id !== null) {
              this.mostrarMensajeExito(validarDocumento);
              this.beepOk.play();
              this.respuestaVotacion();
            } else {
              if (respuesta.estado == 1) {
                this.mostrarMensajeAdvertencia("El documento ya ha registrado su voto anteriormente", "Advertencia");
                this.beepWarnError.play();
              } else if (respuesta.estado == 2) {
                this.mostrarMensajeAdvertencia("El documento ingresado no se encuentra registrado dentro de la asamblea", "Advertencia");
                this.beepError.play();
              } else {
                this.mostrarMensajeError("Error desconocido");
              }
            }
            this.loadignService.hide();
            this.borrarFormulario();
          },
          error: () => {
            this.loadignService.hide();
            this.mostrarMensajeError("Error desconocido");
          }
        });
      }
    } else {
      this.mostrarMensajeAdvertencia("Debe seleccionar el voto masivo", "Advertencia");
       this.loadignService.hide();
    }
  }

  respuestaVotacion(): void {
    this.mostrarRespuestas = false;
    this.coeficienteNo = 0.00;
    this.coeficienteSi = 0.00;
    const preguntaId = localStorage.getItem("preguntaId");
    this.votacionService.respuestaVotacion(Number(preguntaId)).subscribe({
      next: (respuesta: any) => {
        this.coeficienteNo = respuesta.coeficienteNo;
        this.coeficienteSi = respuesta.coeficienteSi;
        this.mostrarRespuestas = true;
      },
      error: () => {
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }

  mostrarMensajeExito(validarDocumento: string) {
    this.toastr.success(`Voto registrado exitósamente para el documento: ${validarDocumento}`, 'Éxito');
  }

  mostrarMensajeAdvertencia(mensaje: string, titulo: string) {
    this.toastr.warning(mensaje, titulo);
  }

  borrarFormulario() {
    this.filtrosForm.reset();
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }

  obtenerPreguntaActiva() {
    this.preguntaService.obtenerUnicaPregunta().subscribe({
      next: (respuesta: any) => {
        this.pregunta = respuesta.pregunta;
        localStorage.setItem("preguntaId", respuesta.id);;
      },
      error: () => {
        this.mostrarMensajeError("Error desconocido");
      }
    })
  }

  votoSi() {
    localStorage.removeItem("voto");
    localStorage.setItem("voto", "SI");
    this.mostrarBotonNo = false;
  }

  votoNo() {
    localStorage.removeItem("voto");
    localStorage.setItem("voto", "NO");
    this.mostrarBotonSi = false;
  }

  desbloquear() {
    const valor = localStorage.getItem("voto");
    localStorage.removeItem("voto");
    if (valor === "SI") {
      this.mostrarBotonNo = true;
    } else {
      this.mostrarBotonSi = true;
    }
  }
}
