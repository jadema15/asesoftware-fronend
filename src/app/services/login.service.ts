import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  getListUser(): Observable<any> {
    return this.http.get(environment.apiUrlLogin + "UserApp/GetAllUsers")
  }

  registerUser(): Observable<any> {
    const obj = {
      "emailId": "hola@hola.com",
      "fullName": "jairo",
      "password": "hola"
    }
    return this.http.post(environment.apiUrlLogin + "UserApp/CreateNewUser", obj)
  }


  onLogin(login: any, password: any): Observable<any> {
    const obj = {
      "emailId": login,
      "password": password
    }
    return this.http.post(environment.apiUrlLogin + 'UserApp/login', obj);
  }

  logout() {
    this.router.navigate(['/']);
  }

  redireccionar() {
    this.router.navigate(['/turnos']);
  }
}
