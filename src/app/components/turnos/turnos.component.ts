import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { TurnoDto } from 'src/app/models/TurnoDto';
import { ComercioService } from 'src/app/services/comercio.service';
import { ComercioDto } from 'src/app/models/ComercioDto';
import { ServicioService } from 'src/app/services/servicio.service';
import { ServicioDto } from 'src/app/models/ServicioDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  displayedColumns: string[] = ['id_comercio', 'id_servicio', 'fecha_turno', 'hora_inicio', 'hora_fin'];
  dataSource = new MatTableDataSource<TurnoDto>();
  public comercios: ComercioDto[] = [];
  public servicios: ServicioDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private readonly comercioService: ComercioService, private readonly servicioService: ServicioService, readonly turnoSerice: TurnoService) {}

  public filtrosForm: FormGroup = this.fb.group({
  comercio: [null],
  servicio: [null],
  fechaInicio: [null],
  fechaFin: [null],
});


  ngOnInit(): void {
    this.cargarComercios();
    this.cargarServicios();    
  }

  cargarComercios(): void {
    this.comercioService.getComercios().subscribe(comercio=>{
      this.comercios = comercio;      
    }) 
  }

  cargarServicios(): void {
    this.servicioService.getServicios().subscribe(servicio=>{
      this.servicios = servicio;        
    })
  }

  cargarTurnos(): void {
    this.turnoSerice.getTurnos().subscribe(data=>{
       this.dataSource.data = data;
       this.dataSource.paginator = this.paginator;      
    })
  }

  onGenerar(){
    const filtros = this.filtrosForm!.value;
    this.registrarTurno(filtros);
  }


  registrarTurno(filtros: any): void {
    this.turnoSerice.postTurnos(filtros).subscribe(x=>{     
        this.cargarTurnos();
    })
  }

}
