import { Component, OnInit } from '@angular/core';
import { TurnoService } from './services/turno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'asesoftware-app';
  public isLoading = true;
  constructor(){

  }
  ngOnInit(): void {
      console.log("Iniciando Aplicacion");
  }

}
