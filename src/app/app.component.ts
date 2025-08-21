import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'asesoftware-app';
  public isLoading = true;

  ngOnInit(): void {
      console.log("Iniciando Aplicacion");
  }

}
