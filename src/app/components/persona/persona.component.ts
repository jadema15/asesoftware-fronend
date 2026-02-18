import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaDto } from 'src/app/models/PersonasDto';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'primerApellido', 'segundoApellido', 'primerNombre', 'segundoNombre', 'tipoDocumento', 'documento', 'coeficiente', 'propiedad'];
  dataSource = new MatTableDataSource<PersonaDto>();
  public preguntas: PersonaDto[] = [];

  constructor(private readonly personaService: PersonaService, private readonly loadingService: LoadingService) {

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
}
