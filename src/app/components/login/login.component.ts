import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;


  constructor(private readonly auth: AuthService, private readonly fb: FormBuilder, private readonly router: Router,  private readonly toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
     const { username, password } = this.loginForm.value;
     console.log(username, password);
    this.auth.login(username, password).subscribe({
      next: (res: { token: string; }) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('levelUser',"1");
        this.router.navigate(['/turnos']);
      },
      error: () => alert('Credenciales incorrectas')
    });
  }

  mostrarMensajeError() {
    this.toastr.error("El usuario o la contraseña no son correctas, favor validar su información. ", 'Error');
  }
}
