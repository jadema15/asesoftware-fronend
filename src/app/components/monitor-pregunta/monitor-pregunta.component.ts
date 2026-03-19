import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { VotacionService } from 'src/app/services/votacion.service';

@Component({
  selector: 'app-monitor-pregunta',
  templateUrl: './monitor-pregunta.component.html',
  styleUrls: ['./monitor-pregunta.component.css']
})
export class MonitorPreguntaComponent implements OnInit, OnDestroy {

  public pregunta: string = "";
  coeficienteNo: number = 0.00;
  coeficienteSi: number = 0.00
  mostrarBotonSi: boolean = true;
  mostrarBotonNo: boolean = true;
  mostrarRespuestas: boolean = false;
  asistencia: number = 0.00;

   private refreshSub!: Subscription;

  constructor(readonly votacionService: VotacionService, private readonly toastr: ToastrService, readonly preguntaService: PreguntaService, private readonly loadignService: LoadingService, private readonly asistenciaService: AsistenciaService) {

  }

  ngOnInit(): void {
    this.cargarAsistencia();
       this.refreshSub = interval(5000).subscribe(() => {
            this.respuestaVotacion();
        });  
  }

   ngOnDestroy(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }


  respuestaVotacion(): void {
    this.mostrarRespuestas = false;
    this.coeficienteNo = 0.00;
    this.coeficienteSi = 0.00;
    const preguntaId = localStorage.getItem("preguntaId");
    console.log("pregunta activa: ",preguntaId);
    console.log(this.asistencia);
    this.votacionService.respuestaVotacion(Number(preguntaId)).subscribe({
      next: (respuesta: any) => {
        this.coeficienteNo = (respuesta.coeficienteNo/this.asistencia)*100;
        this.coeficienteSi = (respuesta.coeficienteSi/this.asistencia)*100;
        this.mostrarRespuestas = true;
        this.pregunta = respuesta.pregunta.pregunta;
      },
      error: () => {
        this.mostrarMensajeError("Error desconocido");
      }
    });
  }

   cargarAsistencia(): void {
    this.asistenciaService.getAsistenciaIncial().subscribe({
      next: (asistencia) => {
        this.asistencia = asistencia;      
      },
      error: () => {
        console.log("Aqui error");
      }
    });
  }
}