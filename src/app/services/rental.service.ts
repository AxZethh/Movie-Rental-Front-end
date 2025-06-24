import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RentalDto } from '../dto/rental.dto';
import { Film } from '../dto/Film.dto';
import { PaymentType } from '../enum/paymentType';
import { Router } from '@angular/router';
import { RentRequestDto } from '../dto/rent-request.dto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  
  private baseurl = environment.baseUrl;
  cartSubject = new BehaviorSubject<Film[]>(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')!) : []);

  constructor(private http: HttpClient,
    private router: Router
  ) { }


  getRentals(): Observable<any> {
    const url = this.baseurl + "/getRentals";
    return this.http.get(url);
  }

  getRental(id: string): Observable<RentalDto> {
    const url = this.baseurl + "/getRental/" + id;
    return this.http.get<RentalDto>(url);
  }

  checkOut() {
    const filmIds: string[] = JSON.parse(sessionStorage.getItem('cart')!).map((film: Film) => film.id);
    const rental: RentRequestDto = {
      filmIds: filmIds,
      paymentType: PaymentType.CARD
    }
    this.http.post<RentalDto>(this.baseurl + "/checkout", rental).subscribe({
      next: () => {
        this.router.navigate([' '])
        this.cartSubject.next([]);
        sessionStorage.removeItem('cart');  // Left off here
      },
      error: () => this.router.navigate(['/not-found'])
    });
  }

  addToCart(film: Film): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingFilmIndex = cart.findIndex((item: Film) => item.id === film.id);
    if (existingFilmIndex !== -1) {
      cart[existingFilmIndex].rentalDuration += 1;
      sessionStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
      return;
    }
    film.rentalDuration = 1;
    const updatedCart = [...cart, film];
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }
  
  removeFromCart(filmId: string) {
    const cart = JSON.parse(sessionStorage.getItem('cart')!);
    const updatedCart = cart.filter((item: Film) => item.id !== filmId);
    if(updatedCart.length === 0) {
      sessionStorage.removeItem('cart');
      this.cartSubject.next(updatedCart);
      return;
    }
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }
}
