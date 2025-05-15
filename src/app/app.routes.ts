import {Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SearchPanelComponent} from './components/search-panel/search-panel.component';

export const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'exchange', component: SearchPanelComponent},
  {path: '', redirectTo: '/about', pathMatch: 'full'},
];
