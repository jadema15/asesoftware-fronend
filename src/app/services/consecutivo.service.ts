import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ConsecutivoService {

    constructor(private readonly http: HttpClient) { }
  
    private readonly baseUrl = environment.apiUrl;
  
    getIdConsecutivo(): Observable<number> {
      console.log(`${this.baseUrl}/consecutivo/id`);
      return this.http.get<number>(`${this.baseUrl}/consecutivo/id`);
    }

    getConsecutivo(): Observable<boolean> {
      console.log(`${this.baseUrl}/consecutivo`);
      return this.http.get<boolean>(`${this.baseUrl}/consecutivo`);
    }
}
