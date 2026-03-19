import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistenciaDto } from '../models/AsistenciaDto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  getAsistenciaIncial(): Observable<number> {
    console.log(`${this.configService.apiUrl}/asistencia`);
    return this.http.get<number>(`${this.configService.apiUrl}/asistencia`);
  }

  getAsistenciaAll(): Observable<AsistenciaDto[]> {
    return this.http.get<AsistenciaDto[]>(`${this.configService.apiUrl}/asistencia/listado`);
  }
}