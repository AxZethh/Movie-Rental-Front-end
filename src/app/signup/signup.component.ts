import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SignUpDTO } from '../dto/signup.dto';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  
    signUpForm: SignUpDTO = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    message!: string | null;
    constructor(private authService: AuthService) {
      
      
    }
  
    onSubmit() {
      if (!this.signUpForm.email || !this.signUpForm.password) {
        this.message = 'Email and password are required!';
        return;
      }
  
      this.authService.signUp(this.signUpForm).subscribe({
        next: (response) => {
          this.message = response.toString();
        },
        error: (err) => {
          this.message = err.error;
          console.error('Sign up Failed', err);
        }
      });
    }
  
}
