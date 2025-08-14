import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TurnoDto } from '../models/TurnoDto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getTurnos(): Observable<TurnoDto[]> {
    return this.http.get<TurnoDto[]>(`${this.baseUrl}/turno`);
  }


postTurnos(filtros: any): Observable<TurnoDto[]> {
    const elemento = {
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
      idServicio: filtros.servicio
    }
  return this.http.post<TurnoDto[]>(`${this.baseUrl}/turno`,  elemento);
  }
}
