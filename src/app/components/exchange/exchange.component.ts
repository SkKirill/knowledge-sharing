import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

// Child components (must be standalone or declared in a module)
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatComponent } from '../chat/chat.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  skills: string[];
  lastSeen: Date;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ChatListComponent,
    ChatComponent,
    SearchBarComponent
  ]
})
export class ExchangeComponent {
  searchQuery = '';
  activeChat: ChatUser | null = null;

  users: ChatUser[] = [
    {
      id: 1,
      name: 'Анна Ковалёва',
      avatar: 'assets/user1.jpg',
      online: true,
      skills: ['Angular', 'TypeScript'],
      lastSeen: new Date()
    },
    {
      id: 2,
      name: 'Максим Ильин',
      avatar: 'assets/user2.jpg',
      online: false,
      skills: ['UI/UX Design', 'Photoshop'],
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: 'Екатерина Воронова',
      avatar: 'assets/user3.jpg',
      online: true,
      skills: ['Node.js', 'Express', 'MongoDB'],
      lastSeen: new Date(Date.now() - 600000)
    }
  ];

  get isSearching(): boolean {
    return this.searchQuery.trim().length > 0;
  }

  get filteredUsers(): ChatUser[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.users;
    return this.users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  selectUser(user: ChatUser) {
    this.activeChat = user;
  }
}