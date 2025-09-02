import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  getListUser(): Observable<any> {    
    return this.http.get(environment.apiUrlLogin + "UserApp/GetAllUsers")
  }

  registerUser(): Observable<any>{
    const obj = {
      "emailId": "hola@hola.com",
      "fullName": "jairo",
      "password": "hola"
    }
    return this.http.post(environment.apiUrlLogin + "UserApp/CreateNewUser", obj)
  }


   onLogin(login:any, password:any): Observable<any>{
    const obj = {
     "emailId": login,
     "password":password
    }
    return this.http.post(environment.apiUrlLogin+'UserApp/login', obj);
  }
}
