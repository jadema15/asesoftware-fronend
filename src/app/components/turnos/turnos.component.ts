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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


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


  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private readonly comercioService: ComercioService, private readonly servicioService: ServicioService, readonly turnoSerice: TurnoService, private readonly loadingService: LoadingService, private readonly toastr: ToastrService, private readonly dialog: MatDialog) {}

  public filtrosForm: FormGroup = this.fb.group({
      comercio: [null, Validators.required],
      servicio: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      validators: [fechaRangoValido()]
});


  ngOnInit(): void {    
    this.cargarComercios();
    this.cargarTurnos();
  }

  cargarComercios(): void {
    console.log("aqui el metodo");
    this.comercioService.getComercios().subscribe(comercio=>{
      console.log("aqui resultado de comercios", comercio);
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
  this.turnoSerice.postTurnos(filtros).subscribe({
    next: () => {
      this.mostrarMensajeExito();
      this.cargarTurnos();
      this.borrarFormulario();
    },
    error: () => {
      this.mostrarMensajeError();
    }
  });
}


hasTurnos():boolean{
  return this.dataSource.data.length>0;
}


eliminarTurnos(): void {
    if (this.hasTurnos()) {
      this.turnoSerice.deleteTurnos().subscribe({
        next: () => {
          this.mostrarMensajeInformacion();
          this.cargarTurnos();
          this.borrarFormulario();
        },
        error: (err) => {
          console.error(err); 
          this.mostrarMensajeError();
        }
      });
    }
}

borrarFormulario(){
    this.filtrosForm.reset();
    this.dataSource.data=[];
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

    mostrarMensajeInformacion() {
    this.toastr.info('Datos eliminados con éxito', 'Información');   
  }

  modalEliminarTurno() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que quieres eliminar los turnos?',
        title: 'Confirmar eliminación'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {       
        this.eliminarTurnos();
        console.log('Turnos eliminados');      
      } else {       
        console.log('Cancelado');
      }
    });
  }

  mostrarMensajeError() {
    this.toastr.error('Se ha presentado un error', 'Error');   
  }  

  getToUpperCase(text: string): string{
    return text.toUpperCase();
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
