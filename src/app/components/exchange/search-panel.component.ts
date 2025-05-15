import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface UserProfile {
  id: string;
  name: string;
  skill: string;
  level: string;
  source: string;
}

@Component({
  selector: 'app-search-panel',
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
    // TODO: уведомить компонент боковой панели о добавлении
    console.log('Пользователь выбран:', user);
  }
}
