import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface KnowledgeItem {
  name: string;
  place?: string;
  level?: string;
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
    MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class ProfileComponent {
  @ViewChild('profileForm') profileForm!: NgForm;
  
  photos: string[] = [];
  currentPhotoIndex = 0;
  lastName = '';
  firstName = '';
  gender = '';
  birthDate: Date | null = null;
  email = '';
  about = '';
  
  // Маска телефона
  phoneModel = '';
  phoneDisplay = '+7(___) ___-__-__';
  
  // Уровни знаний
  levels = ['Начальный', 'Средний', 'Продвинутый', 'Эксперт'];
  
  // Категории знаний
  knowledgeCategories = [
    { 
      key: 'wantToLearn', 
      label: 'Хочу изучить', 
      items: [] as KnowledgeItem[],
      addPlaceholder: 'Добавить цель обучения'
    },
    { 
      key: 'wantToShare', 
      label: 'Могу поделиться', 
      items: [] as KnowledgeItem[],
      addPlaceholder: 'Добавить навык'
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  // Проверка валидности всей формы
  isFormValid(): boolean {
    // Проверка основной формы
    if (!this.profileForm || this.profileForm.invalid) {
      return false;
    }
    
    // Проверка телефона
    if (!this.isPhoneValid()) {
      return false;
    }
    
    // Проверка "О себе"
    if (!this.about || this.about.length < 50) {
      return false;
    }
    
    // Проверка навыков
    if (this.knowledgeCategories[0].items.length === 0 || 
        this.knowledgeCategories[1].items.length === 0) {
      return false;
    }
    
    // Проверка фото
    if (this.photos.length === 0) {
      return false;
    }
    
    return true;
  }

  // Проверка валидности телефона
  isPhoneValid(): boolean {
    return this.phoneModel.length === 11;
  }

  // Управление фотографиями
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      
      if (this.photos.length + filesArray.length > 10) {
        this.showSnackbar('Можно загрузить не более 10 фото');
        return;
      }

      filesArray.forEach(file => {
        if (!file.type.match('image.*')) {
          this.showSnackbar('Можно загружать только изображения');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.photos.push(reader.result as string);
          if (this.photos.length === 1) {
            this.currentPhotoIndex = 0;
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeCurrentPhoto() {
    if (this.photos.length > 0) {
      this.photos.splice(this.currentPhotoIndex, 1);
      if (this.currentPhotoIndex >= this.photos.length && this.photos.length > 0) {
        this.currentPhotoIndex = this.photos.length - 1;
      }
    }
  }

  prevPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  // Управление знаниями
  addKnowledge(categoryKey: string) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    if (category) {
      const newItem: KnowledgeItem = {
        name: '',
        isEditing: true
      };
      
      if (categoryKey === 'wantToShare') {
        newItem.level = this.levels[0];
      }
      
      category.items.push(newItem);
    }
  }

  saveSkill(item: KnowledgeItem, categoryKey: string, index: number) {
    if (!item.name || item.name.trim() === '') {
      this.showSnackbar('Название не может быть пустым');
      return;
    }
    
    if (categoryKey === 'wantToShare' && !item.level) {
      this.showSnackbar('Выберите уровень');
      return;
    }
    
    item.name = item.name.trim();
    item.isEditing = false;
  }

  removeKnowledge(categoryKey: string, index: number) {
    const category = this.knowledgeCategories.find(c => c.key === categoryKey);
    if (category) {
      category.items.splice(index, 1);
    }
  }

  // Маска телефона
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const position = input.selectionStart || 0;
    const key = (event as InputEvent).data;
    
    if (key && /\d/.test(key)) {
      const nextPos = this.findNextDigitPosition(position);
      
      if (nextPos !== -1) {
        this.phoneDisplay = this.insertDigit(this.phoneDisplay, nextPos, key);
        this.phoneModel = '7' + this.phoneDisplay.replace(/\D/g, '').substring(1);
        
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
    
    if (position >= 3) {
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

  // Сохранение профиля
  saveProfile() {
    if (!this.isFormValid()) {
      this.showSnackbar('Заполните все обязательные поля корректно');
      return;
    }
    
    const profileData = {
      personalInfo: {
        lastName: this.lastName,
        firstName: this.firstName,
        gender: this.gender,
        birthDate: this.birthDate,
        phone: this.phoneModel,
        email: this.email,
        about: this.about,
        photos: this.photos
      },
      skillsToLearn: this.knowledgeCategories[0].items,
      skillsToShare: this.knowledgeCategories[1].items
    };
    
    console.log('Сохраненные данные:', profileData);
    this.showSnackbar('Профиль успешно сохранен');
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-style']
    });
  }
}