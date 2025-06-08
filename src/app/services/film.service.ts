import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Film } from '../dto/Film.dto';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllFilms(): Observable<Film[]> {
    const url = this.baseUrl + "/getFilms";
    return this.http.get<Film[]>(url)
  }

  getFilm(id: string): Observable<Film> {
    const url = this.baseUrl + "/getFilm/" + id;
    return this.http.get<Film>(url);
  }

  getAvailableFilms(): Observable<Film[]> {
    const url = this.baseUrl + "/getAvailableFilms";
    return this.http.get<Film[]>(url);
  }
  
} 
