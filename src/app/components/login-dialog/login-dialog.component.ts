import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatFormField,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  email = '';
  password = '';
  isRegistering = false;
  stage = 1;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitEmail(): void {
    // TODO: Отправить email на сервер и получить ответ: входит или регистрируется
    // В зависимости от ответа, установить this.isRegistering
    // Здесь пока просто пример
    if (this.email === 'test@example.com') {
      this.isRegistering = true; // Пользователь входит
    } else {
      this.isRegistering = true; // Пользователь регистрируется
    }
    this.stage = 2;
  }

  submitPassword(): void {
    // TODO: Отправить пароль на сервер для аутентификации/регистрации
    // В случае успеха закрыть диалог
    // Здесь пока просто пример
    this.dialogRef.close('success'); // Закрываем диалог и передаем "success"
  }
}
