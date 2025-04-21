import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BusBooking, IBusDetails, User } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  http = inject(HttpClient);
  apiUrl: string = 'https://api.freeprojectapi.com/api/BusBooking/';
   
  constructor() { 
  }

  searchBuses(fromId: string, toId: string, date: string) {
    return this.http.get(`${this.apiUrl}searchBus2?fromLocation=${fromId}&toLocation=${toId}&travelDate=${date}`);
  }

  getBusDetailsByScheduleId(scheduleId: number):Observable<IBusDetails> {
    return this.http.get<IBusDetails>(`${this.apiUrl}GetBusScheduleById?id=${scheduleId}`);
  }
  

  createNewBooking(obj:BusBooking){
    return this.http.post(`${this.apiUrl}PostBusBooking`,obj);
  }

  getBookedSeats(scheduleId:number){
   return this.http.get(`${this.apiUrl}getBookedSeats?shceduleId=${scheduleId}`)
  }

  loginUser(obj:any){
    return this.http.post(`${this.apiUrl}login`,obj);
  }

  registerUser(obj:User){
    return this.http.post(`${this.apiUrl}CreateUser`, obj);
  }

   getMyBookings(id:number){
    return this.http.get(`${this.apiUrl}GetBusBooking?id=${id}`);
   }
}
