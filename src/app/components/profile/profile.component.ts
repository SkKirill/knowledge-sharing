import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Интерфейс знаний
interface KnowledgeItem {
  name: string;
  place?: string;
  level?: string;
  isEditing?: boolean;
}

// Компонент диалога удаления аккаунта
@Component({
  selector: 'app-delete-account-dialog',
  template: `
    <h2 mat-dialog-title>Подтверждение удаления</h2>
    <mat-dialog-content>
      <p>Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Нет, отменить</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Да, удалить</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule]
})
export class DeleteAccountDialogComponent {}

// Компонент диалога изменения пароля
@Component({
  selector: 'app-change-password-dialog',
  template: `
    <h2 mat-dialog-title>Изменить пароль</h2>
    <mat-dialog-content>
      <form #passwordForm="ngForm" (ngSubmit)="onSubmit(passwordForm.value)">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Старый пароль</mat-label>
          <input matInput type="password" name="oldPassword" [(ngModel)]="oldPassword" required minlength="6">
          <mat-error *ngIf="passwordForm.controls.oldPassword?.errors?.['required']">Введите старый пароль</mat-error>
          <mat-error *ngIf="passwordForm.controls.oldPassword?.errors?.['minlength']">Минимум 6 символов</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Новый пароль</mat-label>
          <input matInput type="password" name="newPassword" [(ngModel)]="newPassword" required minlength="8">
          <mat-error *ngIf="passwordForm.controls.newPassword?.errors?.['required']">Введите новый пароль</mat-error>
          <mat-error *ngIf="passwordForm.controls.newPassword?.errors?.['minlength']">Минимум 8 символов</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Подтвердите пароль</mat-label>
          <input matInput type="password" name="confirmPassword" [(ngModel)]="confirmPassword" required>
          <mat-error *ngIf="passwordForm.controls.confirmPassword?.errors?.['required']">Подтвердите пароль</mat-error>
        </mat-form-field>

        <div *ngIf="passwordMismatch" class="mat-error">
          Пароли не совпадают
        </div>

        <mat-dialog-actions align="end">
          <button mat-button type="submit" [disabled]="!passwordForm.form.valid || newPassword !== confirmPassword">
            Сохранить
          </button>
          <button mat-button [mat-dialog-close]="false" type="button">Отменить</button>
        </mat-dialog-actions>
      </form>
    </mat-dialog-content>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ChangePasswordDialogComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {}
  
  onSubmit(formData: any) {
    if (formData.newPassword === formData.confirmPassword) {
      this.dialogRef.close({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });
    } else {
      this.passwordMismatch = true;
    }
  }
}

// Основной компонент профиля
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
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
    MatSnackBarModule,
    MatDialogModule,
    DeleteAccountDialogComponent,
    ChangePasswordDialogComponent // ✅ Добавлено
  ],
  providers: [MatDialog] // ✅ Провайдер диалога
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

  phoneModel = '';
  phoneDisplay = '+7(___) ___-__-__';

  levels = ['Начальный', 'Средний', 'Продвинутый', 'Эксперт'];

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

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  // --- Валидация формы ---
  isFormValid(): boolean {
    return (
      !!this.firstName &&
      !!this.lastName &&
      !!this.email &&
      this.about.length >= 50 &&
      this.knowledgeCategories[0].items.length > 0 &&
      this.knowledgeCategories[1].items.length > 0 &&
      this.phoneModel.length === 11 &&
      this.photos.length > 0
    );
  }

  // --- Телефон ---
  isPhoneValid(): boolean {
    return this.phoneModel.length === 11;
  }

  findNextDigitPosition(currentPos: number): number {
    const underscores = [4,5,6,9,10,11,13,14,16,17];
    for (const pos of underscores) {
      if (pos >= currentPos && this.phoneDisplay.charAt(pos) === '_') {
        return pos;
      }
    }
    return -1;
  }

  findPrevDigitPosition(currentPos: number): number {
    const underscores = [17,16,14,13,11,10,9,6,5,4];
    for (const pos of underscores) {
      if (pos <= currentPos && this.phoneDisplay.charAt(pos) !== '_') {
        return pos;
      }
    }
    return -1;
  }

  insertDigit(str: string, pos: number, digit: string): string {
    return str.substring(0, pos) + digit + str.substring(pos + 1);
  }

  replaceWithUnderscore(str: string, pos: number): string {
    return str.substring(0, pos) + '_' + str.substring(pos + 1);
  }

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

  // --- Управление фотографиями ---
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement)?.files;
    if (!files || this.photos.length + files.length > 10) {
      this.showSnackbar('Можно загрузить не более 10 фото');
      return;
    }

    Array.from(files).forEach(file => {
      if (!file.type.match('image.*')) {
        this.showSnackbar('Можно загружать только изображения');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.photos.push(reader.result as string);
        if (this.photos.length === 1) this.currentPhotoIndex = 0;
      };
      reader.readAsDataURL(file);
    });
  }

  removeCurrentPhoto() {
    if (this.photos.length > 0) {
      this.photos.splice(this.currentPhotoIndex, 1);
      this.currentPhotoIndex = Math.min(this.currentPhotoIndex, this.photos.length - 1);
    }
  }

  prevPhoto() {
    if (this.currentPhotoIndex > 0) this.currentPhotoIndex--;
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) this.currentPhotoIndex++;
  }

  // --- Навыки ---
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

  // --- Изменение пароля ---
  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);

    dialogRef.componentInstance.oldPassword = ''; // Сбрасываем предыдущее значение
    dialogRef.componentInstance.newPassword = '';
    dialogRef.componentInstance.confirmPassword = '';
    dialogRef.componentInstance.passwordMismatch = false;

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.newPassword) {
        this.changePassword(result.oldPassword, result.newPassword);
      }
    });
  }

  changePassword(oldPassword: string, newPassword: string): void {
    console.log('Старый пароль:', oldPassword);
    console.log('Новый пароль:', newPassword);

    // Здесь можно вызвать API
    if (oldPassword === 'current_user_password') {
      if (newPassword.length >= 8) {
        this.showSnackbar('Пароль успешно изменён');
      } else {
        this.showSnackbar('Пароль должен быть не менее 8 символов');
      }
    } else {
      this.showSnackbar('Старый пароль неверен');
    }
  }

  // --- Удаление аккаунта ---
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    console.log('Аккаунт удален');
    this.showSnackbar('Ваш аккаунт удален');
    this.resetProfileData();
  }

  resetProfileData(): void {
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.birthDate = null;
    this.email = '';
    this.about = '';
    this.phoneDisplay = '+7(___) ___-__-__';
    this.phoneModel = '';
    this.photos = [];
    this.knowledgeCategories[0].items = [];
    this.knowledgeCategories[1].items = [];
  }

  // --- Snackbar ---
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000,
      panelClass: ['snackbar-style']
    });
  }

  // --- Сохранение данных ---
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
}