import { Component, Input, OnInit } from '@angular/core';
import { ComercioDto } from 'src/app/models/ComercioDto';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent implements OnInit {
  @Input() comercios: ComercioDto[] = [];

  public mensaje?: string;

  ngOnInit(): void {
    console.log('lista de comercios', this.comercios);
  }

  mostrarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    console.log(
      'Este es el componente tarjeta y recibe este mensaje: ',
      mensaje
    );
  }

  dividirEnFilas(array: any[], tamaño: number): any[][] {
    const resultado = [];
    for (let i = 0; i < array.length; i += tamaño) {
      resultado.push(array.slice(i, i + tamaño));
    }
    return resultado;
  }
}
