import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class ChatListComponent {
  @Input() users: any[] = [];
  @Output() userSelected = new EventEmitter<any>();

  selectUser(user: any) {
    this.userSelected.emit(user);
  }

  formatLastSeen(date: Date): string {
    if (!date) return 'давно';

    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'только что';
    if (diffMinutes < 60) return `был(а) ${diffMinutes} мин назад`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `был(а) ${diffHours} ч назад`;

    return `был(а) ${date.toLocaleDateString()} в ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}