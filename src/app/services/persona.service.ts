import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaDto } from '../models/PersonasDto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly baseUrl = this.configService.apiUrl;

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  getPersonas(): Observable<PersonaDto[]> {
    return this.http.get<PersonaDto[]>(`${this.baseUrl}/persona`);
  }


  getPersonasById(id: number): Observable<PersonaDto> {
    return this.http.get<PersonaDto>(`${this.baseUrl}/persona/id/${id}`);
  }

  putPersona(id: number, filtros: any): Observable<PersonaDto> {
    const body = {
      primerNombre: filtros.primerNombre,
      primerApellido: filtros.primerApellido,
      segundoNombre: filtros.segundoNombre,
      segundoApellido: filtros.segundoApellido,
      documento: filtros.documento,
      propiedad: filtros.propiedad,
    }
    return this.http.put<any>(`${this.configService.apiUrl}/persona/editar/${id}`, body);
  }
}
