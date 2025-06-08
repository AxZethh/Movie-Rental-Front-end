import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginDTO } from '../dto/login.dto';
import { SignUpDTO } from '../dto/signup.dto';
import { BehaviorSubject } from 'rxjs';
import { ConsumerDTO } from '../dto/consumer.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  loggedIn = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(loginForm: LoginDTO) {
    return this.http.post(`${this.baseUrl}/auth/login`, loginForm, { responseType: 'text' });
  }

  signUp(signUpForm: SignUpDTO) {
    return this.http.post(`${this.baseUrl}/auth/signup`, signUpForm, {responseType: 'text'});
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.isAdmin.next(false);
    sessionStorage.removeItem('cart');
  }

  findLoggedInUser() {
    if(!localStorage.getItem('token')) {
      this.loggedIn.next(false);
      this.isAdmin.next(false);
      return;
    }
    this.http.get<ConsumerDTO>(`${this.baseUrl}/getConsumer`).subscribe({
      next: (response) => {
        this.loggedIn.next(true);
        console.log('Logged in user:', response.permission);
        if (response.permission === 'ADMIN' || response.permission === 'SUPER_ADMIN') {
          this.isAdmin.next(true);
        }
      },
      error: (err) => {
        console.error('Error fetching logged in user:', err);
        this.logout();
      }
    });
  }
}
