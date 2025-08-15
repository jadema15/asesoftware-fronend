import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { TurnoDto } from 'src/app/models/TurnoDto';
import { ComercioService } from 'src/app/services/comercio.service';
import { ComercioDto } from 'src/app/models/ComercioDto';
import { ServicioService } from 'src/app/services/servicio.service';
import { ServicioDto } from 'src/app/models/ServicioDto';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrService } from 'ngx-toastr';

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

  isLoading = true;
  hasError = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private readonly comercioService: ComercioService, private readonly servicioService: ServicioService, readonly turnoSerice: TurnoService, private readonly loadingService: LoadingService, private readonly toastr: ToastrService) {}

  public filtrosForm: FormGroup = this.fb.group({
      comercio: [null, Validators.required],
      servicio: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      validators: [fechaRangoValido()]
});


  ngOnInit(): void {    
    this.cargarComercios();
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

  cargarServiciosByComercio(e: any): void { 
    const id_comercio = e.value
    this.servicioService.getServiciosByComercio(id_comercio).subscribe(servicio=>{
      if(servicio.length>0){
          this.servicios = servicio; 
      }else{
          this.servicios = [];      
      }           
    })
  }

  cargarTurnos(): void {
    this.turnoSerice.getTurnos().subscribe(data=>{
       this.dataSource.data = data;
       this.dataSource.paginator = this.paginator;      
    })
  }

  onGenerar(){
    if (this.filtrosForm.invalid) {
      this.filtrosForm.markAllAsTouched(); 
      return; 
    }  
    const filtros = this.filtrosForm!.value;
    this.registrarTurno(filtros);
    
  }


registrarTurno(filtros: any): void {
  this.turnoSerice.postTurnos(filtros).subscribe(
    response => {
      this.mostrarMensajeExito();
      this.cargarTurnos();
      this.borrarFormulario();
    },
    error => {
      this.mostrarMensajeError();
    }
  );
}


  borrarFormulario(){
    this.filtrosForm.reset();
  }

  onFechaFinChange(e: any){
    const fechaInicio = this.filtrosForm.controls['fechaInicio'].value;
    const fechaFinal = e.target.value
    if(fechaFinal<fechaInicio){
      console.log("Error en fechas");
      this.hasError = true;
    }else{
      console.log("Fechas correctas");
       this.hasError = false;
    }   
  }

  mostrarMensajeExito() {
    this.toastr.success('Operación exitosa', 'Éxito');   
  }

  mostrarMensajeError() {
    this.toastr.error('Se ha presentado un error', 'Error');   
  }  
}

export function fechaRangoValido(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const fechaInicio = form.get('fechaInicio')?.value;
    const fechaFin = form.get('fechaFin')?.value;

    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      return { rangoFechasInvalido: true };
    }

    return null;
  };
}
