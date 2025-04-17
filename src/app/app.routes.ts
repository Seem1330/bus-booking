import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

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
            path: 'search-result',
            component:SearchResultComponent
        }

];
