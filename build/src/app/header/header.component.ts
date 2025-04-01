// header.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; // Required for *ngIf in older Angular versions
import { Header1Component } from '../header1/header1.component';
import { Header2Component } from '../header2/header2.component';

@Component({
  selector: 'app-header',
  standalone: true, // Only if using standalone components
  imports: [CommonModule, Header1Component, Header2Component], // Import CommonModule instead of AuthService
  template: `
    <app-header1 *ngIf="!isLoggedIn()"></app-header1>
    <app-header2 *ngIf="isLoggedIn()"></app-header2>
  `
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    // localStorage stores values as strings, so we need to compare with 'true'
    return localStorage.getItem('loggedIn') === 'true';
  }
}