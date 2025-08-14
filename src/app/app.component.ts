import { Component, OnInit } from '@angular/core';
import { TurnoService } from './services/turno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'asesoftware-app';
  constructor(private readonly turnoService: TurnoService){

  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.turnoService.getTurnos().subscribe(x=>{
    console.log(x);
})
  }
}
