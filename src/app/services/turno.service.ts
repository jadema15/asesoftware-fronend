import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TurnoDto } from '../models/TurnoDto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  //private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }


  postAsistencia(filtros: any): Observable<TurnoDto[]> {
    const body = {
      documento: filtros.documento,
      asambleaId: 1,
      estado: 'activo',
    }
    return this.http.post<any>(`${this.configService.apiUrl}/asistencia`, body);
  }


  putAsistencia(filtros: any): Observable<TurnoDto[]> {
    const body = {
      documento: filtros.documento
    }
    return this.http.put<any>(`${this.configService.apiUrl}/asistencia`, body);
  }
}