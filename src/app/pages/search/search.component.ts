import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../models/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  locationList :any []=[];
  searchObj:Search = new Search();

  http = inject(HttpClient);
  route = inject(Router);

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(){
    this.http.get('https://api.freeprojectapi.com/api/BusBooking/GetBusLocations').subscribe((res:any)=> {
      this.locationList = res;
    })
  }

  searchBuses(){
    this.route.navigate(['search-result', this.searchObj.fromLocationId, this.searchObj.toLocationId, this.searchObj.date]);
}
}
