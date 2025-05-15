import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Добавлен CommonModule для *ngIf
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'knowledge-exchange';
  isLoggedIn = false;

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }
} ;