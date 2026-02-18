import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { RespuestaDto } from '../models/RespuestaDto';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  postVotacion(filtros: any): Observable<RespuestaDto[]> {
    const body = {
      documento: filtros.documento,
      preguntaId: filtros.preguntaId,
      voto: filtros.voto,
    }
    return this.http.post<any>(`${this.baseUrl}/respuestas`, body);
  }

  respuestaVotacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/respuestas/pregunta/${id}`);
  }
}
