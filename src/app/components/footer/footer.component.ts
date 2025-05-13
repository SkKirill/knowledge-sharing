import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
  ]
})
export class FooterComponent {
  @ViewChild('locationModal') locationModal!: ElementRef;

  showLocationModal() {
    this.locationModal.nativeElement.style.display = 'flex';
  }

  closeLocationModal() {
    this.locationModal.nativeElement.style.display = 'none';
  }
}
