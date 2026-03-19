import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsecutivoService } from 'src/app/services/consecutivo.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, private readonly reportesService: ReportesService, private readonly preguntaService: PreguntaService, private readonly loadingService: LoadingService, private readonly dialog: MatDialog, private readonly consecutivoService: ConsecutivoService, private readonly toastr: ToastrService, private readonly router: Router) { }

  listaPreguntas: any[] = [];
  public consecutivo: boolean = false;
  public idConsecutivo: number = 0;

  public filtrosForm: FormGroup = this.fb.group({
    pregunta: [null, Validators.required]
  });

  ngOnInit(): void {
    this.cargarPreguntasAsamblea();
    this.obtenerIdConsecutivo();
  }

  descargarExcel() {
    this.loadingService.show();
    this.reportesService.descargarExcel().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'asistentes_asamblea.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.loadingService.hide();
    }, error => {
      console.error('Error al descargar el archivo:', error);
      this.loadingService.hide();
    });
  }

   descargarExcelInasistentes() {
    this.loadingService.show();
    this.reportesService.descargarExcel().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'inasistentes_asamblea.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.loadingService.hide();
    }, error => {
      console.error('Error al descargar el archivo:', error);
      this.loadingService.hide();
    });
  }

  descargarExcelRespuestas() {
    this.loadingService.show();
    const id = this.filtrosForm.get('pregunta')?.value;

    let preguntaSeleccionada: any = this.listaPreguntas.find(item => {
      return item.id === id
    });

    if (id != null) {
      const nombreArchivo = preguntaSeleccionada.pregunta.replace(/\s+/g, '_').substring(0, 45);;
      this.reportesService.descargarExcelRespuestas(id).subscribe(blob => {
        if (blob.size === 0) {
          console.log("No se encontraron respustas");
          this.mostrarMensajeAdvertencia("No se encontraron respuestas", "Advertencia");
          this.loadingService.hide();
        } else {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = nombreArchivo + '.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.loadingService.hide();
        }
      }, error => {
        this.loadingService.hide();
        console.error('Error al descargar el archivo:', error);
      });
    } else {
      this.mostrarMensajeAdvertencia("No se ha seleccionado ninguna pregunta", "Advertencia");
      this.loadingService.hide();
    }
  }

  cargarPreguntasAsamblea(): void {
    this.loadingService.show();
    this.preguntaService.getPreguntas().subscribe(preguntas => {
      this.listaPreguntas = preguntas
      this.loadingService.hide()
    })
    this.loadingService.hide()
  }

  modalEliminarPregunta() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Esta realmente seguro de iniciar un nuevo control de Quorum?',
        title: 'Iniciar Quorum'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.iniciarQuorum();
      }
    });
  }

  iniciarQuorum() {
    this.consecutivoService.getConsecutivo().subscribe(consecutivo => {
      this.consecutivo = consecutivo;
      if (this.consecutivo) {
        console.log("Se creo con exito");
        this.toastr.success('Consecutivo creado con éxito', 'Éxito');
      } else {
        console.log("Fallo la creacion del consecutivo");
        this.toastr.error("Fallo la creacion del consecutivo", 'Se ha presentado un Error');
      }
    })
  }

  obtenerIdConsecutivo() {
    this.consecutivoService.getIdConsecutivo().subscribe(consecutivo => {
      this.idConsecutivo = consecutivo;
    })
  }

  mostrarMensajeAdvertencia(mensaje: string, titulo: string) {
    this.toastr.warning(mensaje, titulo);
  }

  asistencias() {
    this.router.navigate(['/asistencia']);
  }

  propietarios() {
    this.router.navigate(['/persona']);
  }
}