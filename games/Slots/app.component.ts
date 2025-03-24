import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  symbols = ['🍒', '🍋', '🍋‍🟩', '🍉', '🍇', '💰'];// win + ;  symbole
  reels = ['❔', '❔', '❔'];
  isSpinning = false;
  resultMessage = '';
  balance = 100; // pieniadze początkowe
  betAmount = 1; // koszt
  minBet = 1;     // min zaklad
  maxBet = 10000;
  betInGame = 0;   // max zaklad

  spinReels() { //brak środkow

    if (this.balance < this.betAmount) {
      this.resultMessage = '❌ Brak środków!';
      return;
    }
    
    this.isSpinning = true;
    this.resultMessage = '';
    this.balance -= this.betAmount; // koszt krecenia
    this.betInGame = this.betAmount; // przypisanie bet do zakręcena (błąd z zmianą bet podczas kręcenia)
  
    let intervals: any[] = []; //tablica do intervalów
    const spinTimes = [1500, 3000, 4500]; //czasy w ms kręcenia się każdej rolki
  
    for (let i = 0; i < this.reels.length; i++) { //interval zmiania sybole co 100ms
      //dla  każder rolki zmiana obrazka co 100ms
      intervals[i] = setInterval(() => {
      this.reels[i] = this.getRandomSymbol();
      }, 100);
  
      setTimeout(() => {
        //koniec intervalaczyli mieszania symboli
        clearInterval(intervals[i]);
        if (i === this.reels.length - 1) {
          this.isSpinning = false;
          this.checkWin();
        }
      }, spinTimes[i]);
    }
  }

  getRandomSymbol() { //randomowa liczba-symbol
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  checkWin() {
    const [first, second, third] = this.reels;
    //sprawdza czy symbol jest taki jak pierwszy(arr[0])
    if (first === second && second === third) {
      const winnings = this.betInGame * 100; //mnośnik wygranej
      this.balance += winnings;
      this.resultMessage = 'WYGRANA🎉' + winnings;
    }else if (first === second || first === third || second === third) {
      const winnings = this.betInGame * 1.5; // pryz dwoch takich samych mnożnik x2
      this.balance += winnings;
      this.resultMessage = 'wygrana' + winnings;
    } else {
      this.resultMessage = 'spróbuj ponownie';
    }
  }
  
  increaseBet() {
    if (this.betAmount < this.maxBet) {
      this.betAmount += 1;
    }
  }

  decreaseBet() {
    if (this.betAmount > this.minBet) {
      this.betAmount -= 1;
    }
  }

  multiplyBet() {
    let newBet = this.betAmount * 10;
    if (newBet <= this.maxBet) {
      this.betAmount = newBet;
    }
  }

  shareBet() {
    let newBet = Math.floor(this.betAmount / 10); // zaokrągla w dol

    if (newBet >= this.minBet) {
      this.betAmount = newBet;
    } else {
      this.betAmount = this.minBet; // nie poniżej zera
    }
  }
}
