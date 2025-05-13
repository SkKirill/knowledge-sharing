import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonToggle],
})
export class AboutComponent {
  images: string[] = [
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
  ];

  currentSlide = 0;

  showSlide(index: number): void {
    this.currentSlide = index;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}
