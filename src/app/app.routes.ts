import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';

export const routes: Routes = [
        {path:'',
            redirectTo:'search',
            pathMatch:'full'
        },
        {
            path:'search',
            component:SearchComponent
        },
        {
            path: 'search-result/:fromId/:toId/:date',
            component:SearchResultComponent
        },
        {
            path: 'book-ticket/:scheduleId',
            component:BookTicketsComponent
        },
        {
            path:'my-bookings/:bookingId/:busName',
            component:MyBookingComponent
        }

];
