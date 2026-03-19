import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroments';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  //private readonly api = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly router: Router, private configService: ConfigService) {}

  login(username: string, password: string) {
    console.log(`${this.configService.apiUrl}/auth/login`);
    console.log(username, password);
    return this.http.post<any>(`${this.configService.apiUrl}/auth/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${this.configService.apiUrl}/register`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}