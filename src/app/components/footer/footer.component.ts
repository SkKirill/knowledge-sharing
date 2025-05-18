import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ]
})
export class FooterComponent {
  @ViewChild('locationModal') locationModal!: ElementRef;

  // Текущие настройки местоположения
  locationSettings = {
    method: 'auto',
    currentLocation: 'Воронежская обл / г Воронеж',
    manualLocation: 'Воронеж',
    displayLocation: 'г Воронеж' // Добавляем поле для отображения в кнопке
  };

  regions = [
    'Москва',
    'Санкт-Петербург',
    'Воронеж',
    'Екатеринбург',
    'Новосибирск',
    'Казань',
    'Нижний Новгород',
    'Ростов-на-Дону',
    'Краснодар',
    'Другой регион'
  ];

  showLocationModal(): void {
    this.locationModal.nativeElement.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (this.locationSettings.method === 'auto') {
      this.detectLocation();
    }
  }

  closeLocationModal(): void {
    this.locationModal.nativeElement.style.display = 'none';
    document.body.style.overflow = '';
  }

  detectLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const demoLocations = ['Москва', 'Санкт-Петербург', 'Воронеж', 'Екатеринбург'];
          const randomLocation = demoLocations[Math.floor(Math.random() * demoLocations.length)];
          this.locationSettings.currentLocation = `${randomLocation} (автоопределение)`;
          this.locationSettings.displayLocation = `г ${randomLocation}`;
        },
        (error) => {
          console.error('Ошибка определения местоположения:', error);
          this.locationSettings.currentLocation = 'Не удалось определить (разрешите доступ к геолокации)';
        }
      );
    } else {
      this.locationSettings.currentLocation = 'Геолокация не поддерживается вашим браузером';
    }
  }

applyLocationSettings(): void {
  if (this.locationSettings.method === 'manual') {
    if (this.locationSettings.manualLocation) {
      this.locationSettings.currentLocation = this.locationSettings.manualLocation;
      this.locationSettings.displayLocation = `г ${this.locationSettings.manualLocation}`;
    }
  } else {
    // Для автоматического режима displayLocation уже обновляется в detectLocation()
    if (!this.locationSettings.displayLocation) {
      const city = this.locationSettings.currentLocation.split(' ')[0];
      this.locationSettings.displayLocation = `г ${city}`;
    }
  }
  
  this.closeLocationModal();
  localStorage.setItem('locationSettings', JSON.stringify(this.locationSettings));
}

  ngOnInit(): void {
    const savedSettings = localStorage.getItem('locationSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      this.locationSettings = {
        ...this.locationSettings,
        ...parsedSettings
      };
      
      // Инициализируем displayLocation если его нет в сохраненных настройках
      if (!parsedSettings.displayLocation) {
        this.locationSettings.displayLocation = 
          parsedSettings.method === 'manual' 
            ? `г ${parsedSettings.manualLocation}` 
            : parsedSettings.currentLocation.includes('автоопределение')
              ? `г ${parsedSettings.currentLocation.split(' ')[0]}`
              : 'г Воронеж';
      }
    }
  }
}