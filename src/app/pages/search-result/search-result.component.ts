import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MasterService } from '../services/master.service';
import { ISearchBus, Search } from '../models/model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  activatedRoute = inject(ActivatedRoute);
  masterService = inject(MasterService);
  searchObj:Search = new Search();
  searchData :ISearchBus[] = [];


  constructor() { 
    this.activatedRoute.params.subscribe((res:any) => {
      this.searchObj.fromLocationId = res.fromId;
      this.searchObj.toLocationId = res.toId;
      this.searchObj.date = res.date;
      this.getSearchResult();
    });
  }


  getSearchResult(){
    this.masterService.searchBuses(this.searchObj.fromLocationId, this.searchObj.toLocationId, this.searchObj.date).subscribe((res:any) => {
      this.searchData = res;
    } )
  }
}
