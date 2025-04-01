import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blackjack',
  imports: [CommonModule, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  currentBalance: number = parseInt(localStorage.getItem('balance') ?? '1000', 10);
  currentBet: number = 0;
  gameStarted: boolean = false;
  gameOver: boolean = false;
  message: string = 'Place your bet to start!';
  betInput: number = 50;


  private deck: string[] = [];
  playerHand: string[] = [];
  dealerHand: string[] = [];
  playerScore: number = 0;
  dealerScore: number = 0;
  canDouble: boolean = false;
  canSplit: boolean = false;

  ngOnInit(): void {
    this.loadBalance();
  }

  // Make this method public since it's used in the template
  getCardValue(card: string): number {
    const rank = card.slice(0, -1);
    switch(rank) {
      case 'A': return 11;
      case 'K':
      case 'Q':
      case 'J':
      case '10': return 10;
      default: return parseInt(rank);
    }
  }

  // ... rest of the methods remain the same ...
  private loadBalance(): void {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
      this.currentBalance = parseFloat(savedBalance);
    }
  }

  private saveBalance(): void {
    localStorage.setItem('balance', this.currentBalance.toString());
  }

  startGame(): void {
    if (this.betInput <= 0 || this.betInput > this.currentBalance) {
      this.message = `Invalid bet amount! (Available: $${this.currentBalance})`;
      return;
    }

    this.currentBet = this.betInput;
    this.currentBalance -= this.currentBet;
    this.gameStarted = true;
    this.gameOver = false;
    this.message = '';
    
    this.initializeDeck();
    this.shuffleDeck();
    
    this.playerHand = [];
    this.dealerHand = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    
    this.dealInitialCards();
    
    this.canDouble = this.playerHand.length === 2 && this.currentBalance >= this.currentBet;
    this.canSplit = this.playerHand.length === 2 && 
                   this.getCardValue(this.playerHand[0]) === this.getCardValue(this.playerHand[1]) && 
                   this.currentBalance >= this.currentBet;
    
    this.saveBalance();
  }

  private initializeDeck(): void {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.deck = [];
    
    for (const suit of suits) {
      for (const rank of ranks) {
        this.deck.push(`${rank}${suit}`);
      }
    }
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private dealInitialCards(): void {
    this.playerHand.push(this.deck.pop()!);
    this.dealerHand.push(this.deck.pop()!);
    this.playerHand.push(this.deck.pop()!);
    this.dealerHand.push(this.deck.pop()!);
    
    this.calculateScores();
    
    if (this.playerScore === 21) {
      this.handleBlackjack();
    }
  }

  private calculateScores(): void {
    this.playerScore = this.calculateHandValue(this.playerHand);
    this.dealerScore = this.calculateHandValue(this.dealerHand);
  }

  private calculateHandValue(hand: string[]): number {
    let value = 0;
    let aces = 0;
    
    for (const card of hand) {
      const cardValue = this.getCardValue(card);
      value += cardValue;
      if (cardValue === 11) aces++;
    }
    
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  }

  hit(): void {
    if (this.gameOver) return;
    
    this.playerHand.push(this.deck.pop()!);
    this.calculateScores();
    
    if (this.playerScore > 21) {
      this.message = 'Bust! You lose';
      this.gameOver = true;
    } else if (this.playerScore === 21) {
      this.stand();
    }
    
    this.canDouble = false;
    this.saveBalance();
  }

  stand(): void {
    if (this.gameOver) return;
  
    this.gameOver = true;
  
    const drawDealerCard = () => {
      if (this.dealerScore < 17) {
        this.dealerHand.push(this.deck.pop()!);
        this.calculateScores();
  
        setTimeout(drawDealerCard, 1000); // Wait 1 second before drawing the next card
      } else {
        this.determineWinner();
        this.saveBalance();
      }
    };
  
    drawDealerCard(); // Start the delayed card drawing process
  }

  double(): void {
    if (!this.canDouble || this.gameOver) return;
    
    this.currentBalance -= this.currentBet;
    this.currentBet *= 2;
    this.canDouble = false;
    
    this.hit();
    if (!this.gameOver) {
      this.stand();
    }
  }

  split(): void {
    if (!this.canSplit || this.gameOver) return;
    
    this.message = 'Split functionality coming soon!';
    this.canSplit = false;
  }

  private handleBlackjack(): void {
    if (this.playerScore === 21 && this.playerHand.length === 2) {
      if (this.dealerScore === 21 && this.dealerHand.length === 2) {
        this.message = 'Push! Both have blackjack';
        this.currentBalance += this.currentBet;
      } else {
        this.message = 'Blackjack! You win 3:2';
        this.currentBalance += this.currentBet * 2.5;
      }
      this.gameOver = true;
      this.saveBalance();
    }
  }

  private determineWinner(): void {
    if (this.playerScore > 21) {
      this.message = 'Bust! You lose';
    } else if (this.dealerScore > 21) {
      this.message = 'Dealer busts! You win';
      this.currentBalance += this.currentBet * 2;
    } else if (this.playerScore > this.dealerScore) {
      this.message = 'You win!';
      this.currentBalance += this.currentBet * 2;
    } else if (this.playerScore === this.dealerScore) {
      this.message = 'Push!';
      this.currentBalance += this.currentBet;
    } else {
      this.message = 'You lose';
    }
  }

  resetGame(): void {
    this.gameStarted = false;
    this.gameOver = false;
    this.message = 'Place your bet to start!';
    this.currentBet = 0;
    this.betInput = 50;
  }

  getCardColor(card: string): string {
    return card.endsWith('♥') || card.endsWith('♦') ? 'red' : 'black';
  }

  isFaceDown(card: string, index: number): boolean {
    return index === 0 && !this.gameOver && this.dealerHand.length > 1;
  }
}