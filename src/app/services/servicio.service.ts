import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { ServicioDto } from '../models/ServicioDto';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly baseUrl = environment.apiUrl;
  
    constructor(private readonly http: HttpClient) { }
  
    getServicios(): Observable<ServicioDto[]> {
      return this.http.get<ServicioDto[]>(`${this.baseUrl}/servicio`);
    }  


    getServiciosByComercio(id:number): Observable<ServicioDto[]> {
      return this.http.get<ServicioDto[]>(`${this.baseUrl}/servicio/comercio/${id}`);
    }
  
}
