import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { PreguntaDto } from '../models/PreguntaDto';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  putPregunta(id: number, filtros: any): Observable<PreguntaDto[]> {
    const body = {
      pregunta: filtros.pregunta
    }
    return this.http.put<any>(`${this.baseUrl}/preguntas/editar/${id}`, body);
  }

  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getPreguntas(): Observable<PreguntaDto[]> {
    return this.http.get<PreguntaDto[]>(`${this.baseUrl}/preguntas`);
  }

  postPregunta(filtros: any): Observable<PreguntaDto[]> {
    const body = {
      pregunta: filtros.pregunta
    }
    return this.http.post<any>(`${this.baseUrl}/preguntas`, body);
  }

  activarUnicaPregunta(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/preguntas/activar-pregunta/${id}`);
  }

  eliminarPregunta(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/preguntas/${id}`);
  }

  obtenerUnicaPregunta(): Observable<PreguntaDto> {
    return this.http.get<PreguntaDto>(`${this.baseUrl}/preguntas/pregunta-activa`);
  }
}