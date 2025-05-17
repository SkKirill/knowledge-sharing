import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class LoginDialogComponent {
  email = '';
  password = '';
  confirmPassword = '';
  verificationCode = '';
  rememberMe = true;
  isRegistering = true;
  stage = 1; // 1 - логин, 2 - ввод кода, 3 - регистрация

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitEmail(): void {
    if (!this.email) {
      alert('Введите email');
      return;
    }

    // Пример: если email совпадает — считаем, что пользователь зарегистрирован
    if (this.email.toLowerCase() === '535389@bk.ru') {
      this.isRegistering = false; // пользователь входит
    } else {
      this.isRegistering = true; // пользователь регистрируется
    }
    this.stage = 2;
    this.sendVerificationCode(this.email);
  }

  submitPassword(): void {
    if (!this.password) {
      alert('Введите пароль');
      return;
    }

    // Здесь можно добавить отправку на сервер для проверки пароля
    this.dialogRef.close('success');
  }

  submitLogin(): void {
    if (!this.email || !this.password) {
      alert('Введите email и пароль');
      return;
    }

    // Логика входа
    this.submitEmail();
  }

  goToRegister(): void {
    this.stage = 3;
    this.clearForm();
  }

  submitVerificationCode(): void {
    if (!this.verificationCode) {
      alert('Введите код подтверждения');
      return;
    }

    if (this.verificationCode === '1234') {
      this.dialogRef.close('success');
    } else {
      alert('Неверный код');
    }
  }

  submitRegistration(): void {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Заполните все поля');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    // Здесь отправка данных регистрации на сервер
    this.dialogRef.close('registered');
  }

  private sendVerificationCode(email: string): void {
    console.log(`Отправляем код подтверждения на почту ${email}`);
    // TODO: Вызов API для отправки кода
  }

  private clearForm(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.verificationCode = '';
    this.rememberMe = false;
  }
}
