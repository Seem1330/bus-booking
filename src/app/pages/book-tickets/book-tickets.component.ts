import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { BusBookingPassenger, BusBooking, IBusDetails, User } from '../models/model';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../../shared/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-tickets',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit, OnDestroy {

  busData!: IBusDetails;
  seatRows: any[][] = [];
  seats: number[] = [];
  selectedSeatArray: BusBookingPassenger[] = [];
  bookTicketsObj: BusBooking = new BusBooking();
  bookedSeatList: number[] = []
  private destroy$ = new Subject<void>();
  activatedRoute = inject(ActivatedRoute);
  masterService = inject(MasterService);
  authService = inject(AuthService);
  router = inject(Router);


  constructor(private loginService: LoginService) {
    this.activatedRoute.params.subscribe((params) => {
      const scheduleId = params['scheduleId'];
      this.bookTicketsObj.scheduleId = scheduleId;
      this.bookTicketsObj.bookingDate = new Date();
      this.getBusDetails(scheduleId);
      this.getBusBookedSeats(scheduleId);
    });
    this.loginService.loginModal$.subscribe(() => {
      this.loginService.openLoginModal(); // No recursion, clean separation
    });
  }

  ngOnInit() {
    this.authService.loginCall$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loginService.openLoginModal();
      });
  }


  getBusDetails(scheduleId: number) {
    this.masterService.getBusDetailsByScheduleId(scheduleId).subscribe((data: IBusDetails) => {
      this.busData = data;
      this.seats = [];
      for (let i = 1; i <= this.busData.totalSeats; i++) {
        this.seats.push(i)
      }
      for (let i = 0; i < this.busData.totalSeats; i += 4) {
        this.seatRows.push(this.seats.slice(i, i + 4));
      }
    });
  }

  getBusBookedSeats(scheduleId: number) {
    this.masterService.getBookedSeats(scheduleId).subscribe((data: any) => {
      this.bookedSeatList = data;
    });
  }



  checkIfSeatIsSelected(seatNo: number) {
    const check = this.selectedSeatArray.find((seat) => seat.seatNo == seatNo);
    if (check == undefined) {
      return false;
    } else {
      return true;
    }
  }

  checkIfBooked(seatNo: number) {
    const check1 = this.bookedSeatList.find((m) => m == seatNo);
    if (check1 == undefined) {
      return false;
    } else {
      return true;
    }
  }

  selectSeat(id: number) {
    const isExist = this.selectedSeatArray.findIndex((seat) => seat.seatNo == id);
    if (isExist != -1) {
      this.selectedSeatArray.splice(isExist, 1);
    } else {
      const newpassenger: BusBookingPassenger = {
        seatNo: id,
        age: 0,
        bookingId: 0,
        gender: '',
        passengerName: '',
        passengerId: 0
      }
      this.selectedSeatArray.push(newpassenger);
      console.log(this.selectedSeatArray);
    }
  }

  bookTickets() {
    const user = this.authService.getUser();  //  Get user from AuthService
    if (!user || !user.userId) {
      alert("Please login first.");
      this.loginService.triggerLoginModal();
      return;
    } else {
      this.bookTicketsObj.custId = user.userId;  //  Set custId from logged-in user
      this.bookTicketsObj.busBookingPassengers = this.selectedSeatArray;
      this.masterService.createNewBooking(this.bookTicketsObj).subscribe(
        (res: any) => {
          console.log(res);
          alert("Ticket Booked Successfully");
          localStorage.setItem('booking-seat', JSON.stringify(this.bookTicketsObj));
          this.router.navigate(['my-bookings', res.bookingId, this.busData.busName],{  state: { bookingData: this.bookTicketsObj } });
        },
        (err) => {
          console.error("Booking failed:", err);
          alert("Something went wrong. Please try again.");
        }
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
