import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { AsistenciaDto } from '../models/AsistenciaDto';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private readonly http: HttpClient) { }

  private readonly baseUrl = environment.apiUrl;

  getAsistenciaIncial(): Observable<number> {
    console.log(`${this.baseUrl}/asistencia`);
    return this.http.get<number>(`${this.baseUrl}/asistencia`);
  }

    getAsistenciaAll(): Observable<AsistenciaDto[]> {
    return this.http.get<AsistenciaDto[]>(`${this.baseUrl}/asistencia/listado`);
  }
}