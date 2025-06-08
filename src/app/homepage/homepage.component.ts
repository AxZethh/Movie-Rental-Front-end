import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule, MatButtonModule,RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  loggedIn: boolean = false;
  constructor(private auth: AuthService) {
   this.auth.loggedIn.subscribe(status => {
      this.loggedIn = status;
    });
  }
}
