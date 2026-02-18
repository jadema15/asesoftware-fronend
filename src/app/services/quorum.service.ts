import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { TurnoDto } from '../models/TurnoDto';

@Injectable({
  providedIn: 'root'
})
export class QuorumService {

    private readonly baseUrl = environment.apiUrl;
  
    constructor(private readonly http: HttpClient) { }  
  
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
