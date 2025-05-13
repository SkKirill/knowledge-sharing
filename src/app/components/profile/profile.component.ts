import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
 // styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ]
})
export class ProfileComponent {
  user = {
    name: 'Анастасия Винокурова',
    email: 'anastasya@example.com',
    role: 'Ученик / Учитель',
    bio: 'Обучаюсь в университете, учу программирование и делюсь опытом.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular'],
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d '
  };

  editProfile() {
    // Логика редактирования профиля
    alert('Переход к редактированию профиля');
  }

  logout() {
    // Логика выхода
    alert('Вы вышли из аккаунта');
  }
}