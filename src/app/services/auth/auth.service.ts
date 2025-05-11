import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): Promise<any> {
    // TODO: Реальная логика аутентификации
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          resolve({ success: true, userId: 1 });
        } else {
          reject({ success: false, message: 'Invalid credentials' });
        }
      }, 500); // Имитация задержки
    });
  }

  register(email: string, password: string): Promise<any> {
    // TODO: Реальная логика регистрации
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true, userId: 2 });
      }, 500); // Имитация задержки
    });
  }

  isAuthenticated(): boolean {
    // TODO: Проверка токена или другой логики авторизации
    return false;
  }
}
