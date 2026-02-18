import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  descargarExcel() {
    return this.http.get(`${this.baseUrl}/reportes`, {
      responseType: 'blob'
    });
  }

  descargarExcelRespuestas(id: number) {
    return this.http.get(`${this.baseUrl}/reportes/pregunta/${id}`, {
      responseType: 'blob'
    });
  }
}
