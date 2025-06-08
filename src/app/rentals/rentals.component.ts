import { Component, OnInit } from '@angular/core';
import { RentalDto } from '../dto/rental.dto';
import { RentalService } from '../services/rental.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rentals',
  imports: [DatePipe, RouterLink],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent implements OnInit {

  rentals!: RentalDto[];
  rental!: RentalDto;

  constructor(
    private rentalService: RentalService,
  ) { }
  

  ngOnInit() {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe({
      next: (response) => {
        this.rentals = response;
      },
      error: (err) => console.error("Error getting Rentals: " + err)
    })
  }
}
