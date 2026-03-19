import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoDto } from '../models/TurnoDto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QuorumService {

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  private readonly baseUrl = this.configService.apiUrl;

  postAsistencia(filtros: any): Observable<TurnoDto[]> {
    const body = {
      documento: filtros.documento,
      asambleaId: 1,
      estado: 'activo',
    }
    return this.http.post<any>(`${this.baseUrl}/quorum`, body);
  }

  getAsistenciaIncial(): Observable<number> {
    console.log(`${this.baseUrl}/quorum`);
    return this.http.get<number>(`${this.baseUrl}/quorum/consulta-quorum`);
  }
}
