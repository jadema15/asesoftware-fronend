import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  @Input() valor:number | undefined;
  @Output() saludar = new EventEmitter<string>();

  ngOnInit(): void {
    console.log("desde imagen", this.valor)
  }

  ejecutar(e: Event){
    console.log("se presiono el boton");
    const valorEnviado = "Es un valor enviado";
    this.enviarSaludo(valorEnviado);
  }

  enviarSaludo(mensaje: string) {
    console.log("Se envia el dato");
    this.saludar.emit(mensaje);
  }

}
