import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, AppComponent, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  hajs: number = 0;
  karta: number = 0;
  balans: number = 0;

  constructor(private app: AppComponent, private router: Router) {}

  checkInputs(event: Event) {
    event.preventDefault();
    const error = document.getElementById('Error') as HTMLElement;
    
    // Reset error message
    error.textContent = '';
    
    // Validate inputs
    if (this.hajs <= 0) {
      error.textContent = "Środki muszą być większe od 0";
      return;
    }
    
    if (this.karta.toString().length !== 16) {
      error.textContent = "Numer karty kredytowej powinien mieć 16 cyfr";
      return;
    }

    console.log('Form submission started');
    
    this.app.kaska += this.hajs;
    console.log('App balance updated to:', this.app.kaska);

    if (typeof localStorage !== 'undefined') {
      try {
        let currentBalance = 0;
        const storedBalance = localStorage.getItem('balance');
        if (storedBalance) {
          currentBalance = parseInt(storedBalance, 10) || 0;
        }
        
        console.log('Current localStorage balance:', currentBalance);
        
        const newBalance = currentBalance + this.hajs;
        localStorage.setItem('balance', newBalance.toString());

        console.log('New balance saved to localStorage:', newBalance);
        
        const verifiedValue = localStorage.getItem('balance');

        console.log('Verified stored value:', verifiedValue);

        
        if (verifiedValue !== newBalance.toString()) {
          throw new Error('Storage verification failed');
        }
        
        // Update component state
        this.balans = newBalance;
        this.app.kaska = newBalance; // Keep app balance in sync
        error.textContent = 'Wpłacono środki!'
        window.location.reload()
        
      } catch (e) {
        console.error('LocalStorage error:', e);
        error.textContent = "Błąd zapisu - spróbuj odświeżyć stronę";
        return;
      }
    } else {
      console.error('LocalStorage is not available');
      error.textContent = "Przeglądarka nie obsługuje zapisu danych";
      return;
    }


    this.router.navigate(['/main']);
  }
}
