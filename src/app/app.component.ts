import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { Film } from './dto/Film.dto';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Prices } from './enum/prices';
import { RentalService } from './services/rental.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'movie-renting-frontend';
  cart: Film[] = [];
  prices = Prices;
  totalPrice: number = 0;
  rentalsVisibility: boolean = true;
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.authService.findLoggedInUser();
    this.authService.loggedIn.subscribe({
      next: (response) => {
        this.loggedIn = response;
      }
    });
    this.authService.isAdmin.subscribe(
      (response) => {
        this.isAdmin = response;
      }
    );
    this.rentalService.cartSubject.subscribe({
      next: (response) => {
        this.cart = response;
        this.calculateTotalPrice();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.isAdmin = false;
  }

  removeFromCart(filmId: string) {
    this.rentalService.removeFromCart(filmId);
  }
  
  cartStatus() {
    // This method is now simplified as the subscription is handled in ngOnInit
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((acc, film) => {
      return acc += this.prices[film.priceType] as unknown as number * film.rentalDuration;
  }, 0);
  }

  checkOut() {
    if (this.cart.length > 0) {
      this.rentalService.checkOut();
      this.cart = [];
      this.calculateTotalPrice();
    }
  }
}
