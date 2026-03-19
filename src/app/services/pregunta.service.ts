import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntaDto } from '../models/PreguntaDto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  putPregunta(id: number, filtros: any): Observable<PreguntaDto[]> {
    const body = {
      pregunta: filtros.pregunta
    }
    return this.http.put<any>(`${this.configService.apiUrl}/preguntas/editar/${id}`, body);
  }

  getPreguntas(): Observable<PreguntaDto[]> {
    return this.http.get<PreguntaDto[]>(`${this.configService.apiUrl}/preguntas`);
  }

  postPregunta(filtros: any): Observable<PreguntaDto[]> {
    const body = {
      pregunta: filtros.pregunta
    }
    return this.http.post<any>(`${this.configService.apiUrl}/preguntas`, body);
  }

  activarUnicaPregunta(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.configService.apiUrl}/preguntas/activar-pregunta/${id}`);
  }

  eliminarPregunta(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.configService.apiUrl}/preguntas/${id}`);
  }

  obtenerUnicaPregunta(): Observable<PreguntaDto> {
    return this.http.get<PreguntaDto>(`${this.configService.apiUrl}/preguntas/pregunta-activa`);
  }
}