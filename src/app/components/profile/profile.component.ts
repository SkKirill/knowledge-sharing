import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface KnowledgeItem {
  name: string;
  place: string;
  level: string;
  isEditing?: boolean;
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ProfileComponent {
  photos: string[] = [];
  lastName = '';
  firstName = '';
  middleName = '';
  gender: string = '';
  birthDate: Date | null = null;
  email = '';
  phone = '';
  about = '';

  // Для маски телефона
  phoneModel = '';  // Хранит чистые цифры (79991234567)
  phoneDisplay = '+7(___) ___-__-__';  // Отображаемое значение

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
    const files = (event.target as HTMLInputElement)?.files;
    if (files) {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.photos.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addKnowledge(categoryKey: string) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    if (category) {
      category.items.push({
        name: '',
        place: '',
        level: this.levels[0],
        isEditing: true
      });
    }
  }

  removeKnowledge(categoryKey: string, index: number) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    if (category) {
      category.items.splice(index, 1);
    }
  }

  saveProfile() {
    console.log({
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      gender: this.gender,
      birthDate: this.birthDate,
      email: this.email,
      phone: this.phoneModel, // Используем phoneModel вместо phone
      about: this.about,
      knowledge: this.knowledgeCategories,
      photos: this.photos
    });
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const position = input.selectionStart || 0;
    const key = (event as InputEvent).data;
    
    // Если введена цифра
    if (key && /\d/.test(key)) {
      // Находим следующую позицию для ввода цифры
      const nextPos = this.findNextDigitPosition(position);
      
      if (nextPos !== -1) {
        // Вставляем цифру в шаблон
        this.phoneDisplay = this.insertDigit(this.phoneDisplay, nextPos, key);
        
        // Обновляем чистый номер (без маски)
        this.phoneModel = '7' + this.phoneDisplay.replace(/\D/g, '').substring(1);
        
        // Устанавливаем курсор на следующую позицию
        setTimeout(() => {
          input.setSelectionRange(nextPos + 1, nextPos + 1);
        });
      }
    }
  }
onPhoneBackspace(event: Event) {
  const keyboardEvent = event as KeyboardEvent;
  const input = keyboardEvent.target as HTMLInputElement;
  const position = (input.selectionStart || 0) - 1;
  
  if (position >= 3) {  // Don't allow deleting +7
    const prevPos = this.findPrevDigitPosition(position);
    
    if (prevPos !== -1) {
      this.phoneDisplay = this.replaceWithUnderscore(this.phoneDisplay, prevPos);
      this.phoneModel = '7' + this.phoneDisplay.replace(/\D/g, '').substring(1);
      
      setTimeout(() => {
        input.setSelectionRange(prevPos, prevPos);
      });
    }
  }
  keyboardEvent.preventDefault();
}

  // Вспомогательные методы для маски телефона
  private findNextDigitPosition(currentPos: number): number {
    const underscores = [4,5,6,9,10,11,13,14,16,17];
    for (const pos of underscores) {
      if (pos >= currentPos && this.phoneDisplay.charAt(pos) === '_') {
        return pos;
      }
    }
    return -1;
  }

  private findPrevDigitPosition(currentPos: number): number {
    const underscores = [17,16,14,13,11,10,9,6,5,4];
    for (const pos of underscores) {
      if (pos <= currentPos && this.phoneDisplay.charAt(pos) !== '_') {
        return pos;
      }
    }
    return -1;
  }

  private insertDigit(str: string, pos: number, digit: string): string {
    return str.substring(0, pos) + digit + str.substring(pos + 1);
  }

  private replaceWithUnderscore(str: string, pos: number): string {
    return str.substring(0, pos) + '_' + str.substring(pos + 1);
  }
}