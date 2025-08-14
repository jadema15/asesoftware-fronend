import { ServicioDto } from "./ServicioDto";

export class TurnoDto{  
    
   servicio!: ServicioDto;
   fechaTurno!: Date;
   horaInicio: any;
   horaFin: any
   estado!: string  
}
