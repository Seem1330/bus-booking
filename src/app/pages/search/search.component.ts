import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  locationList :any []=[];
  http = inject(HttpClient);
  route = inject(Router);

  // locationList: { locationId: number; locationName: string ,code:string }[] = [];

  constructor(){}
  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(){
    this.http.get('https://api.freeprojectapi.com/api/BusBooking/GetBusLocations').subscribe((res:any)=> {
      this.locationList = res;
    })
  }

}
