import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ConsecutivoService {

    constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }
  
    private readonly baseUrl = this.configService.apiUrl;
  
    getIdConsecutivo(): Observable<number> {
      console.log(`${this.baseUrl}/consecutivo/id`);
      return this.http.get<number>(`${this.baseUrl}/consecutivo/id`);
    }

    getConsecutivo(): Observable<boolean> {
      console.log(`${this.baseUrl}/consecutivo`);
      return this.http.get<boolean>(`${this.baseUrl}/consecutivo`);
    }
}
