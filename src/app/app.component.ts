import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NgIf
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'knowledge-exchange';
  isLoggedIn = false; // Флаг для отображения меню после входа

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }
}
