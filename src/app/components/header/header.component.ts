import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, NgOptimizedImage],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() loginSuccess = new EventEmitter<void>(); // Событие для оповещения об успешном входе

  constructor(public dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loginSuccess.emit(); // Оповещаем app.component об успешном входе
      }
      console.log('The dialog was closed');
    });
  }
}
