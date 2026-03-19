import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) { }

  descargarExcel() {
    return this.http.get(`${this.configService.apiUrl}/reportes`, {
      responseType: 'blob'
    });
  }

  descargarExcelRespuestas(id: number) {
    return this.http.get(`${this.configService.apiUrl}/reportes/pregunta/${id}`, {
      responseType: 'blob'
    });
  }
}
