import {Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ExchangeComponent} from './components/exchange/exchange.component';

export const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'exchange', component: ExchangeComponent},
  {path: '', redirectTo: '/about', pathMatch: 'full'},
];
