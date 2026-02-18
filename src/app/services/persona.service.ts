import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { PersonaDto } from '../models/PersonasDto';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

   private readonly baseUrl = environment.apiUrl;
 
   constructor(private readonly http: HttpClient) { }

    getPersonas(): Observable<PersonaDto[]> {
       return this.http.get<PersonaDto[]>(`${this.baseUrl}/persona`);
     }
}
