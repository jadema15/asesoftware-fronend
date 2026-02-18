import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciaDto } from 'src/app/models/AsistenciaDto';
import { PersonaDto } from 'src/app/models/PersonasDto';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'primerApellido', 'segundoApellido', 'primerNombre', 'segundoNombre', 'documento', 'estado', 'horaInicio', 'horaFin', 'coeficiente', 'propiedad'];
  dataSource = new MatTableDataSource<AsistenciaDto>();

  constructor(private readonly asistenciaService: AsistenciaService, private readonly loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.cargarAsistencia();
  }

  cargarAsistencia(): void {
    this.loadingService.show();
    this.asistenciaService.getAsistenciaAll().subscribe(asistencia => {
      console.log(asistencia);
      this.dataSource.data = asistencia.sort((a, b) => a.id - b.id);
      this.dataSource.paginator = this.paginator;
      this.loadingService.hide();
    })
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
