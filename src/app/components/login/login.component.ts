import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   // this.registerUser();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Usuario:', username);
      console.log('Contraseña:', password);     
      this.loginService.onLogin(username, password).subscribe({
        next: (res: any)=>{
          console.log(res);
          localStorage.setItem('logData', JSON.stringify(res.data))        
          this.router.navigate(['/turnos']); 
        },
        error:( error: any)=>{
          console.log(error);
        }
      })     
    }
  }

  registerUser(){
    this.loginService.registerUser().subscribe({
       next: (res: any)=>{
          console.log(res);         
        },
        error:( error: any)=>{
          console.log(error);
        }
    });  
  }

}
