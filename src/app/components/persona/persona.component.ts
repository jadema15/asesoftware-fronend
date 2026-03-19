import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PersonaDto } from 'src/app/models/PersonasDto';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ConfirmEditPersonaComponent } from 'src/app/shared/confirm-edit-persona/confirm-edit-persona.component';
import { ConfirmResultadoComponent } from 'src/app/shared/confirm-resultado/confirm-resultado.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'primerApellido', 'segundoApellido', 'primerNombre', 'segundoNombre', 'tipoDocumento', 'documento', 'coeficiente', 'propiedad', 'editar'];
  dataSource = new MatTableDataSource<PersonaDto>();
  public preguntas: PersonaDto[] = [];

  constructor(private readonly personaService: PersonaService, private readonly loadingService: LoadingService, private readonly dialog: MatDialog, private readonly toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.cargarAsistencia();
  }

  cargarAsistencia(): void {
    this.loadingService.show();
    this.personaService.getPersonas().subscribe(persona => {
      this.dataSource.data = persona.sort((a, b) => a.id - b.id);
      this.dataSource.paginator = this.paginator;
      this.loadingService.hide();
    })
  }

  aplicarFiltroDocumento(event: Event) {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.documento
        ?.toLowerCase()
        .includes(filter);
    };

    this.dataSource.filter = valor;
  }


  aplicarFiltroPrimerApellido(event: Event) {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.primerApellido
        ?.toLowerCase()
        .includes(filter);
    };

    this.dataSource.filter = valor;
  }


  aplicarFiltroPrimerNombre(event: Event) {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.primerNombre
        ?.toLowerCase()
        .includes(filter);
    };

    this.dataSource.filter = valor;
  }

  aplicarFiltroPropiedad(event: Event) {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.propiedad
        ?.toLowerCase()
        .includes(filter);
    };

    this.dataSource.filter = valor;
  }

  editar(id: number) {
    this.loadingService.show();
    this.personaService.getPersonasById(id).subscribe(persona => {
      const dialogRef = this.dialog.open(ConfirmEditPersonaComponent, {
        width: '35vw',
        data: {
          persona: persona,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.action === true) {
          console.log("res", result.texto.value);
          this.editarPersona(id, result.texto.value);
        }
      });
    })
    this.loadingService.hide();
  }

  editarPersona(id: number, filtros: any): void {
    this.loadingService.show();
    this.personaService.putPersona(id, filtros).subscribe({
      next: (respuesta: any) => {
        if (respuesta.id !== null) {
          this.mostrarMensajeExito("Propietario Actualizado con éxito");
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

  mostrarMensajeExito(mensaje: string) {
    this.toastr.success(mensaje, 'Éxito');
  }

  mostrarMensajeError(mensaje: string) {
    this.toastr.error(mensaje, 'Se ha presentado un Error');
  }
}
