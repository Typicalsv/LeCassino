import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dices',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './dices.component.html',
  styleUrl: './dices.component.css'
})
export class DicesComponent {

  balance = 100; //zmienne :)
  bet = 2;
  betAmount = 0;
  dice1 = 0;
  dice2 = 0;
  result: number | null = null;
  resultMessage = '';

  rollDice() {
    if (this.betAmount <= 0 || this.betAmount > this.balance) {   //zakład zgodny z saldo
      return; 
    }

    this.dice1 = Math.floor(Math.random() * 6) + 1;  //rolowanie kostek
    this.dice2 = Math.floor(Math.random() * 6) + 1;
    this.result = this.dice1 + this.dice2;

    if (this.result === this.bet) {
      this.balance += this.betAmount * 10; // wygrana x10
      this.resultMessage = `WYGRANA🎉, otrzymujesz ${this.betAmount * 10} zł`;
    } else if (this.result != this.bet){
      this.balance -= this.betAmount; // przegrana -bet
      this.resultMessage = `Spróbuj ponownie, straciłeś ${this.betAmount} zł`;
    } else if(this.balance <= 0){
      this.balance = 0; //brak środkow
      this.resultMessage = `❌ Brak środków!`;
    }
  }
}
