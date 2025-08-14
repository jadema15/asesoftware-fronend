import { ComercioDto } from "./ComercioDto";

export class ServicioDto{  
    
    idServicio!: number;
    comercio!: ComercioDto;
    nomServicio!: string;
    horaApertura: any;
    horaCierre: any;
    duracion!: number;
}
