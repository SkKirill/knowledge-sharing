import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// ✅ Интерфейс знаний
interface KnowledgeItem {
  name: string;
  place: string;
  level: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ProfileComponent {
  profileImageUrl: string | null = null;
  lastName = '';
  firstName = '';
  middleName = '';
  email = '';
  phone = '';
  about = '';

  levels = ['Начальный', 'Средний', 'Продвинутый', 'Эксперт'];

  knowledgeCategories: {
    key: string;
    label: string;
    items: KnowledgeItem[];
  }[] = [
    { key: 'wantToLearn', label: 'Хочу получить знания', items: [] },
    { key: 'wantToShare', label: 'Хочу поделиться знаниями', items: [] },
  ];

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.profileImageUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  addKnowledge(categoryKey: string) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    category?.items.push({ name: '', place: '', level: '' });
  }

  removeKnowledge(categoryKey: string, index: number) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    if (category) category.items.splice(index, 1);
  }

  saveProfile() {
    console.log({
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      email: this.email,
      phone: this.phone,
      about: this.about,
      knowledge: this.knowledgeCategories,
    });
  }
}
