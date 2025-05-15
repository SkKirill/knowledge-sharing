import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  id: string;
  name: string;
  skill: string;
  level: string;
  source: string;
}

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})

export class SearchPanelComponent {
  searchQuery = '';
  users: UserProfile[] = [
    { id: '1', name: 'Аня', skill: 'Angular', level: 'Продвинутый', source: 'Курс Udemy' },
    { id: '2', name: 'Игорь', skill: 'C#', level: 'Средний', source: 'Университет' },
    // добавь больше
  ];
  filteredUsers: UserProfile[] = [...this.users];

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.skill.toLowerCase().includes(query)
    );
  }

  selectUser(user: UserProfile) {
    console.log('Пользователь выбран:', user);
  }
}
