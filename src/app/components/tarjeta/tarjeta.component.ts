import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

    @Input() valor: number | undefined;
     public mensaje?: string;

  ngOnInit(): void {
   console.log("hola", this.valor)
  }

mostrarMensaje(mensaje: string) {
  this.mensaje = mensaje;
    console.log("Este es el componente tarjeta y recibe este mensaje: ", mensaje); // Muestra: ¡Hola desde el componente hijo!
  }
}
