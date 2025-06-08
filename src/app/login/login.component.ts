import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: LoginDTO = {
    email: '',
    password: ''
  };
  message!: string | null;
  
  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  onSubmit() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.message = 'Email and password are required.';
      return;
    }
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.toString());
        this.router.navigate(['/']);
        this.authService.loggedIn.next(true);
      },
      error: (error) => {
        this.message = error.error;
        console.error('Login failed', error);
      }
    });
  }

}
