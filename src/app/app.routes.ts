import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmsComponent } from './films/films.component';
import { RentalsComponent } from './rentals/rentals.component';

export const routes: Routes = [
    {path: "", component: HomepageComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "films", component: FilmsComponent},
    {path: "films/film/:id", component: FilmsComponent},
    {path: "rentals", component: RentalsComponent},
    {path: "rentals/rental/:id", component: RentalsComponent},
    {path: "**", component: NotFoundComponent}
];
