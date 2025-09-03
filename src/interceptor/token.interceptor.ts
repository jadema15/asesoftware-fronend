import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    const logData = localStorage.getItem('logData');
    if (logData !== null) {
      const tokenData = JSON.parse(logData);
      const token = tokenData.token;
      
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
