import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Film } from '../dto/Film.dto';
import { Prices } from '../enum/prices';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-films',
  imports: [DatePipe, MatButtonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnInit {
  prices = Prices;
  film!: Film;
  films!: Film[];
  loggedIn: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private filmService: FilmService,
    private auth: AuthService,
    private rentalService: RentalService) { }


  ngOnInit() {
    this.getFilms();
    this.auth.loggedIn.subscribe(status => {
      this.loggedIn = status;
    });


  }

  getFilms() {
    this.filmService.getAvailableFilms().subscribe({
      next: (response) => {
        this.films = response
        this.route.paramMap.subscribe((params) => {
          if (params.get('id') !== null) {
            this.film = this.films.find(f => f.id === params.get('id'))!;
            return;
          }
        });
      },
      error: () => console.log("Error occured during Fetching of Films")
    });
  }

  navigateToFilm(filmId: string) {
    this.router.navigate(['films/film', filmId]);
  }

  addToCart(film: Film) {
    this.rentalService.addToCart(film);
    
  }
}
