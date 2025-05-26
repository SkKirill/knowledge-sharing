import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';

// Компонент диалога
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

// Для работы с fragment
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule
  ]
})
export class AboutComponent implements AfterViewInit {

  // Методы и данные

  steps = [
    {
      number: 1,
      title: 'Зарегистрируйтесь',
      description: 'Нажмете "Войти | Зарегистрироваться". Регистрация займет пару минут.',
    },
    {
      number: 2,
      title: 'Создайте профиль',
      description: 'Заполните информацию о себе и укажите интересующие знания.',
    },
    {
      number: 3,
      title: 'Найдите собеседника',
      description: 'Ищите людей по интересам и уровню знаний.',
    },
    {
      number: 4,
      title: 'Начните общение',
      description: 'Обменивайтесь знаниями, учитесь и вдохновляйтесь.',
    },
  ];

  benefits = [
    { icon: 'school', text: 'Изучайте новые навыки у опытных пользователей.' },
    { icon: 'chat', text: 'Общайтесь через чат со встроенным переводчиком.' },
    { icon: 'group', text: 'Находите единомышленников и стройте полезные связи.' },
    { icon: 'public', text: 'Доступность интерфейса делает платформу удобной для всех.' }
  ];

  learningItems = [
    { title: 'Играть в шахматы', image: 'About_shah.jpg' },
    { title: 'Заниматься спортом', image: 'About_zal.jpg' },
    { title: 'Выращивать цветы', image: 'About_flor.jpg' },
    { title: 'Программировать', image: 'About_prog.jpg' },
    { title: 'Сортировать мусор', image: 'About_trash.jpg' },
    { title: 'Играть на гитаре', image: 'About_gitar.jpg' },
    { title: 'Фотографировать', image: 'About_foto.jpg' },
    { title: 'Играть в футбол', image: 'About_fut.jpg' }
  ];

  values = [
    {
      title: 'Наши Ценности',
      description: 'Мы верим в силу обмена знаниями и взаимопомощи. Наше сообщество построено на принципах уважения, открытости и стремления к постоянному развитию.',
      image: 'assets/values-illustration.png'
    },
    {
      title: 'Возможности для Развития',
      description: '«Обмен Знаниями» предлагает широкий спектр возможностей для развития ваших навыков и знаний. Вы можете участвовать в обсуждениях, делиться опытом, создавать учебные материалы и помогать другим.',
      image: 'assets/opportunities-illustration.png'
    },
    {
      title: 'Дружелюбное Сообщество',
      description: 'Мы заботимся о том, чтобы каждому было комфортно и интересно на нашей платформе. Здесь вас всегда поддержат, помогут и вдохновят.',
      image: 'assets/community-illustration.png'
    }
  ];

  sliderImages = [
    'About1.jpg',
    'About2.jpg',
  ];

  currentSlide = 0;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  }

  openLoginDialog(showRegistration: boolean = false): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: { showRegistration }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Диалог закрыт', result);
    });
  }

  prevImage() {
    this.currentSlide =
      this.currentSlide === 0 ? this.sliderImages.length - 1 : this.currentSlide - 1;
  }

  nextImage() {
    this.currentSlide =
      this.currentSlide === this.sliderImages.length - 1 ? 0 : this.currentSlide + 1;
  }
}