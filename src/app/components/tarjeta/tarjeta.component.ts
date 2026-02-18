import { Component, Input, OnInit, OnDestroy  } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ComercioDto } from 'src/app/models/ComercioDto';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent implements OnInit, OnDestroy  {

  constructor(private readonly asistenciaService: AsistenciaService, private readonly loadingService: LoadingService) { }

  @Input() comercios: ComercioDto[] = [];

  public mensaje?: string;
  public asistencia: number = 0.0;
  private refreshSub!: Subscription;

  ngOnInit(): void {
    // 🔹 Primera carga
    this.cargarAsistencia();

    // 🔹 Recarga cada 10 segundos
    this.refreshSub = interval(10000).subscribe(() => {
      this.cargarAsistencia();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  mostrarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
  }

  cargarAsistencia(): void {
    //this.loadingService.show();

    this.asistenciaService.getAsistenciaIncial().subscribe({
      next: (asistencia) => {
        this.asistencia = asistencia;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}