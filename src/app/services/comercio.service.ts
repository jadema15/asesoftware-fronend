import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';
import { ComercioDto } from '../models/ComercioDto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  private readonly baseUrl = environment.apiUrl;
  
    constructor(private readonly http: HttpClient) { }
  
    getComercios(): Observable<ComercioDto[]> {
      return this.http.get<ComercioDto[]>(`${this.baseUrl}/comercio`);
    }
}
