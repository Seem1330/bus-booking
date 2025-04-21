import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { ActivatedRoute } from '@angular/router';
import { IMyBookings } from '../models/model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements  OnInit {

  mastserService = inject(MasterService);
  activatedRoute = inject(ActivatedRoute);
  booking :any;
  busName: any;
  mybookingDetails! : IMyBookings;
  bookingSeatDetails : any;
    constructor(){
       this.booking = this.activatedRoute.snapshot.paramMap.get('bookingId');
       this.busName = this.activatedRoute.snapshot.paramMap.get('busName');

        this.getBookings(this.booking);

    }

  getBookings(id:number){
    this.mastserService.getMyBookings(id).subscribe((res:any) => {
      this.mybookingDetails = res;
    }) 
  }  
  // ngOnInit() {
  //   const navigation = this.router.getCurrentNavigation();
  //   const state = navigation?.extras?.state as { bookingData: any };
  
  //   if (state?.bookingData) {
  //     this.bookingSeatDetails = state.bookingData;
  //     console.log('Booking data:', this.bookingSeatDetails);
  //   } else {
  //     console.warn('No booking data found.');
  //     // Optionally fetch booking by ID or show a message
  //   }
  // }

  ngOnInit(): void {
    const booking = localStorage.getItem('booking-seat');
    if (booking) {
      this.bookingSeatDetails = JSON.parse(booking);
      console.log(this.bookingSeatDetails);
    }
  }
}
