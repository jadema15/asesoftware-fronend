import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { RespuestaDto } from '../models/RespuestaDto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  //private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  postVotacion(filtros: any): Observable<RespuestaDto[]> {
    const body = {
      documento: filtros.documento,
      preguntaId: filtros.preguntaId,
      voto: filtros.voto,
    }
    return this.http.post<any>(`${this.configService.apiUrl}/respuestas`, body);
  }

  respuestaVotacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.configService.apiUrl}/respuestas/pregunta/${id}`);
  }
}
