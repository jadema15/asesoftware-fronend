import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly loginService: LoginService, private readonly toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.registerUser();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.onLogin(username, password).subscribe({
        next: (res: any) => {        
          localStorage.setItem('logData', JSON.stringify(res.data))
          localStorage.setItem('token', JSON.stringify(res.data.token));
          this.router.navigate(['/turnos']);
        },
        error: (error: any) => {
          this.mostrarMensajeError();
          console.log(error);
        }
      })
    }
  }

  registerUser() {
    this.loginService.registerUser().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  mostrarMensajeError() {
    this.toastr.error("El usuario o la contraseña no son correctas, favor validar su información. ", 'Error');
  }

}
