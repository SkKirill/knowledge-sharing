import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';  // Для routerLink
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    RouterModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent {
  constructor(private dialog: MatDialog) {}
    openLoginDialog(showRegistration: boolean = false): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: { showRegistration: showRegistration }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Диалог закрыт', result);
    });
  }

steps = [
  {
    number: 1,
    title: 'Зарегистрируйтесь',
    description: 'Нажмете "Войти | Зарегистрироваться". Регистрация займет пару минут.',
    image: 'reg.jpg',
    imageStyle: {
      'min-height': '260px',
      'width': '200px'
    }
  },
  // ... остальные шаги
  {
    number: 2,
    title: 'Создайте профиль',
    description: 'Заполните информацию о себе и укажите интересующие знания.',
    image: 'prof.jpg',
    imageStyle: {
      'height': '250px',
      'width': '350px'
    }
  },
  {
    number: 3,
    title: 'Найдите собеседника',
    description: 'Ищите людей по интересам и уровню знаний.',
    image: 'assets/step2.jpg',
    imageStyle: {
      'height': '200px',
      'width': '200px'
    }
  },
  {
    number: 4,
    title: 'Начните общение',
    description: 'Обменивайтесь знаниями, учитесь и вдохновляйтесь.',
    image: 'assets/step3.jpg',
    imageStyle: {
      'height': '200px',
      'width': '550px'
    }
  }
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
      image: 'pulic/values-illustration.png'
    },
    {
      title: 'Возможности для Развития',
      description: '«Обмен Знаниями» предлагает широкий спектр возможностей для развития ваших навыков и знаний. Вы можете участвовать в обсуждениях, делиться опытом, создавать учебные материалы и помогать другим.',
      image: 'pulic/opportunities-illustration.png'
    },
    {
      title: 'Дружелюбное Сообщество',
      description: 'Мы заботимся о том, чтобы каждому было комфортно и интересно на нашей платформе. Здесь вас всегда поддержат, помогут и вдохновят.',
      image: 'pulic/community-illustration.png'
    }
  ];

sliderImages = [
  'About1.jpg',
  'About2.jpg',

];

currentSlide = 0;

prevImage() {
  this.currentSlide =
    this.currentSlide === 0 ? this.sliderImages.length - 1 : this.currentSlide - 1;
}

nextImage() {
  this.currentSlide =
    this.currentSlide === this.sliderImages.length - 1 ? 0 : this.currentSlide + 1;
}
}

