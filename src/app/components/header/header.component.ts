import {Component, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, NgOptimizedImage, NgIf, MatIconModule],
  styleUrls: ['./header.component.css'],
  standalone: true
})
export class HeaderComponent {
  isLoggedIn = false;

   scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  @Output() loginSuccess = new EventEmitter<void>(); // Событие для оповещения об успешном входе

  constructor(public dialog: MatDialog) {
  }

  openLoginDialog(): void {
    if (this.isLoggedIn) {
        this.isLoggedIn = false;
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loginSuccess.emit(); // Оповещаем app.component об успешном входе
          this.isLoggedIn = true;
        }
        console.log('The dialog was closed');
      });
    }
  }

  
}
