import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
})
export class LoginDialogComponent {
closeDialog() {
throw new Error('Method not implemented.');
}
  email = '';
  password = '';
  confirmPassword = '';
  verificationCode = '';
  rememberMe = true;
  isRegistering = true;
  stage = 1; // 1 - логин, 2 - ввод кода, 3 - регистрация, 4 - восстановление пароля, 5 - новый пароль

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitEmail(): void {
    if (!this.email) {
      alert('Введите email');
      return;
    }

    if (this.email.toLowerCase() === '535389@bk.ru') {
      this.isRegistering = false;
    } else {
      this.isRegistering = true;
    }
    this.stage = 2;
    this.sendVerificationCode(this.email);
  }

  submitPassword(): void {
    if (!this.password) {
      alert('Введите пароль');
      return;
    }
    this.dialogRef.close('success');
  }

  submitLogin(): void {
    if (!this.email || !this.password) {
      alert('Введите email и пароль');
      return;
    }
    this.submitEmail();
  }

  goToRegister(): void {
    this.stage = 3;
    this.clearForm();
  }

  goToPasswordRecovery(): void {
    this.stage = 4;
    this.clearForm();
  }

  backToLogin(): void {
    this.stage = 1;
    this.clearForm();
  }

  submitVerificationCode(): void {
    if (!this.verificationCode) {
      alert('Введите код подтверждения');
      return;
    }

    if (this.verificationCode === '1234') {
      if (this.stage === 2) {
        this.dialogRef.close('success');
      } else if (this.stage === 4) {
        this.stage = 5; // Переход к вводу нового пароля
      }
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
    this.dialogRef.close('registered');
  }

  sendPasswordRecovery(): void {
    if (!this.email) {
      alert('Введите email');
      return;
    }
    
    // Отправляем код восстановления
    this.sendVerificationCode(this.email);
    this.stage = 2; // Переход к вводу кода
  }

  submitNewPassword(): void {
    if (!this.password || !this.confirmPassword) {
      alert('Заполните все поля');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    // Здесь должна быть логика сохранения нового пароля
    alert('Пароль успешно изменен');
    this.dialogRef.close('password_changed');
  }

  private sendVerificationCode(email: string): void {
    console.log(`Отправляем код подтверждения на почту ${email}`);
    // TODO: Вызов API для отправки кода
    // В демо-режиме просто показываем alert
    alert(`Код подтверждения (демо): 1234`);
  }

  private clearForm(): void {
    this.password = '';
    this.confirmPassword = '';
    this.verificationCode = '';
    this.rememberMe = false;
  }
  closeDialog2() {
  if (this.email || this.password) {
    const confirm = window.confirm('Вы уверены, что хотите закрыть форму? Введенные данные будут потеряны.');
    if (!confirm) return;
  }
  this.dialogRef.close();
}
}