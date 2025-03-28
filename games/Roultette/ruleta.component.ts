import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';

type Bet = {
  number: number | string;
  amount: number;
};

@Component({
  selector: 'app-ruleta',
  imports: [ RouterOutlet],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export class RuletaComponent {
constructor(private appComponent: AppComponent) {
    this.money = this.appComponent.kaska; // pieniadze początkowe
    console.log(this.appComponent.kaska)
    console.log(this.money)
  }

  wheelNumbers: number[] = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 
    11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 
    9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  bets: Bet[] = [];
  isSpinning: boolean = false;
  money: number;
  previousResults: { number: number, color: string }[] = [];
  spinInterval!: number;

  placeBet(number: number | string): void {
    if (this.isSpinning) return;
    const betAmount: number = parseInt((document.getElementById('bet-amount') as HTMLInputElement).value);
    if (!betAmount || betAmount <= 0 || betAmount > this.money) {
      alert('Invalid bet amount');
      return;
    }
    if (!this.bets.some(bet => bet.number === number)) {
      this.bets.push({ number, amount: betAmount });
      this.money -= betAmount;
      this.updateMoneyDisplay();
      this.updateBetsDisplay();
    }
  }

  cancelBet(number: number | string): void {
    const betIndex: number = this.bets.findIndex(bet => bet.number == number); 
    if (betIndex !== -1) {
      console.log(`Cancelling bet on ${number}`);
      this.money += this.bets[betIndex].amount;
      this.bets.splice(betIndex, 1);
      this.updateMoneyDisplay();
      this.updateBetsDisplay();
    } else {
      console.log(`Bet on ${number} not found`);
    }
  }

  spinWheel(): void {
    if (this.isSpinning || this.bets.length === 0) {
      alert('Please place a bet before spinning.');
      return;
    }
    this.isSpinning = true;
    this.disableCancelButtons();
    const spinDuration: number = 3000; 
    const spinResult: number = Math.floor(Math.random() * this.wheelNumbers.length);

    let currentIndex: number = 0;
    this.spinInterval = window.setInterval(() => {
      this.updatePickedNumbers(this.wheelNumbers[currentIndex]);
      currentIndex = (currentIndex + 1) % this.wheelNumbers.length;
    }, 100);

    setTimeout(() => {
      clearInterval(this.spinInterval);
      this.isSpinning = false;
      const winningNumber: number = this.wheelNumbers[spinResult];
      this.updatePickedNumbers(winningNumber);
      this.determineWinner(spinResult);
      this.enableCancelButtons();
    }, spinDuration);
  }

  determineWinner(spinResult: number): void {
    const winningNumber: number = this.wheelNumbers[spinResult];
    let winnings: number = 0;
    this.bets.forEach(bet => {
      if (bet.number == winningNumber) { 
        winnings += bet.amount * 35;
      } else if (bet.number === 'red' && this.isRed(winningNumber)) {
        winnings += bet.amount * 2;
      } else if (bet.number === 'black' && this.isBlack(winningNumber)) {
        winnings += bet.amount * 2;
      } else if (bet.number === 'even' && winningNumber % 2 === 0) {
        winnings += bet.amount * 2;
      } else if (bet.number === 'odd' && winningNumber % 2 !== 0) {
        winnings += bet.amount * 2;
      } else if (bet.number === '1to18' && winningNumber >= 1 && winningNumber <= 18) {
        winnings += bet.amount * 2;
      } else if (bet.number === '19to36' && winningNumber >= 19 && winningNumber <= 36) {
        winnings += bet.amount * 2;
      } else if (bet.number === '1st12' && winningNumber >= 1 && winningNumber <= 12) {
        winnings += bet.amount * 3;
      } else if (bet.number === '2nd12' && winningNumber >= 13 && winningNumber <= 24) {
        winnings += bet.amount * 3;
      } else if (bet.number === '3rd12' && winningNumber >= 25 && winningNumber <= 36) {
        winnings += bet.amount * 3;
      } else if (bet.number === 'row1' && [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(winningNumber)) {
        winnings += bet.amount * 3;
      } else if (bet.number === 'row2' && [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(winningNumber)) {
        winnings += bet.amount * 3;
      } else if (bet.number === 'row3' && [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(winningNumber)) {
        winnings += bet.amount * 3;
      }
    });
    this.money += winnings;
    this.updateMoneyDisplay();
    this.bets = [];
    this.updateBetsDisplay();
    this.updatePreviousResults(winningNumber, this.isRed(winningNumber) ? 'Red' : this.isBlack(winningNumber) ? 'Black' : 'Green');
    this.appComponent.kaska = this.money
  }

  updateBetsDisplay(): void {
    const betsDisplay = document.getElementById('bets-display') as HTMLElement;
    betsDisplay.innerHTML = this.bets.length > 0 ? `Your bets: ${this.bets.map(bet => `${bet.number} ($${bet.amount}) <button class="cancel-button" style="
      padding: 5px 10px;
    font-size: 12px;
    background-color: #e53935;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: 5px;
      " data-number="${bet.number}">Cancel</button>`).join(', ')}` : 'No bets placed.';
    document.querySelectorAll('.cancel-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const number = (event.target as HTMLElement).dataset['number']!;
        this.cancelBet(number);
      });
    });
  }

  disableCancelButtons(): void {
    document.querySelectorAll('.cancel-button').forEach(button => {
      (button as HTMLButtonElement).disabled = true;
    });
  }

  enableCancelButtons(): void {
    document.querySelectorAll('.cancel-button').forEach(button => {
      (button as HTMLButtonElement).disabled = false;
    });
  }

  updateMoneyDisplay(): void {
    const moneyDisplay = document.getElementById('money-display') as HTMLElement;
    moneyDisplay.innerHTML = `Money: $${this.money}`;
  }

  updatePreviousResults(number: number, color: string): void {
    this.previousResults.push({ number, color });
    if (this.previousResults.length > 10) {
      this.previousResults.shift();
    }
    const resultsDisplay = document.getElementById('results-display') as HTMLElement;
    resultsDisplay.innerHTML = this.previousResults.map(result => `<div class="result" style="background-color: ${result.color === 'Red' ? '#e53935' : result.color === 'Black' ? '#000' : '#4caf50'};
        width: 40px;
    height: 40px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;">${result.number}</div>`).join('');
  }

  updatePickedNumbers(number: number): void {
    const pickedNumbersDisplay = document.getElementById('picked-numbers-display') as HTMLElement;
    const color = this.isRed(number) ? '#e53935' : this.isBlack(number) ? '#000' : '#4caf50';
    pickedNumbersDisplay.innerHTML = `<div class="picked-number" style="background-color: ${color}; width: 40px;
    height: 40px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;">${number}</div>`;
  }

  isRed(number: number): boolean {
    const redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number);
  }

  isBlack(number: number): boolean {
    const blackNumbers: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    return blackNumbers.includes(number);
  }

  ngOnInit(): void {
    document.querySelectorAll('.bet-button').forEach(button => {
      button.addEventListener('click', () => {
        const number = (button as HTMLElement).dataset['number'] ? parseInt((button as HTMLElement).dataset['number']!) : (button as HTMLElement).dataset['bet']!;
        this.placeBet(number);
      });
    });

    document.getElementById('spin-button')!.addEventListener('click', () => this.spinWheel());
  }

}
