import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-baccarat',
  templateUrl: './baccarat.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./baccarat.component.css']
})
export class BaccaratComponent implements OnInit {

constructor(private appComponent: AppComponent) {
    this.money = parseFloat(this.appComponent.kaska.toFixed(2)); // pieniadze początkowe
  }


  money: number;
  bet: number = 0;
  playerMoney: number = 0;
  tieMoney: number = 0;
  bankerMoney: number = 0;
  playerbetplayer: boolean = false;
  playerbettie: boolean = false;
  playerbetbanker: boolean = false;
  gameOver: boolean = false;
  gameStarted: boolean = false;

  cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  Cardvalue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0];
  playerHand: string[] = [];
  bankerHand: string[] = [];
  playerScore: number = 0;
  bankerScore: number = 0;
  playerHandContainer: string = "";
  bankerHandContainer: string = "";
  result: string = "";

  randomIndex() {
    return Math.floor(Math.random() * this.cards.length);
  }

  ngOnInit() {
    const betInput = document.getElementById('bet') as HTMLInputElement;
    if (betInput) {
      this.bet = betInput.valueAsNumber;
    }
  }

  playerBet() {
    if(!this.gameStarted && !this.gameOver){
    const betInput = document.getElementById('bet') as HTMLInputElement;

    if (betInput) {
      this.bet = betInput.valueAsNumber;
    }

    if (this.bet <= 0 || this.bet > this.money || Number.isNaN(this.bet)) {
      alert('Invalid bet amount!');
    } else {
      this.money = this.money - this.bet
      this.money = parseFloat(this.money.toFixed(2))
      this.playerMoney += this.bet;

      this.playerbetplayer = true;
      this.playerbettie = false;
      this.playerbetbanker = false;
      this.gameStarted = true;
      this.appComponent.kaska = parseFloat(this.money.toFixed(2));
      
        this.deal();
      }
      
    }
  }

  betTie() {
    if(!this.gameStarted && !this.gameOver){
    const betInput = document.getElementById('bet') as HTMLInputElement;

    if (betInput) {
      this.bet = betInput.valueAsNumber;
    }

    if (this.bet <= 0 || this.bet > this.money || Number.isNaN(this.bet)) {
      alert('Invalid bet amount!');
    } else {
      this.money = this.money - this.bet
      this.money = parseFloat(this.money.toFixed(2))
      this.tieMoney += this.bet;

      this.playerbetplayer = false;
      this.playerbettie = true;
      this.playerbetbanker = false;
      this.gameStarted = true;

      this.appComponent.kaska = parseFloat(this.money.toFixed(2));
      
        this.deal();
      }
    }
  }

  betBanker() {
    if(!this.gameStarted && !this.gameOver){  
        const betInput = document.getElementById('bet') as HTMLInputElement;

    if (betInput) {
      this.bet = betInput.valueAsNumber;
    }

    if (this.bet <= 0 || this.bet > this.money || Number.isNaN(this.bet)) {
      alert('Invalid bet amount!');
    } else {
      this.money = this.money - this.bet
      this.money = parseFloat(this.money.toFixed(2))
      this.bankerMoney += this.bet;
      this.appComponent.kaska = parseFloat(this.money.toFixed(2));
      this.playerbetplayer = false;
      this.playerbettie = false;
      this.playerbetbanker = true;
      this.gameStarted = true;
      
        this.deal();
      }
     
    }
  }

  deal() {
    setTimeout(() => {
      this.playerHand.push(this.cards[this.randomIndex()]);
      this.bankerHand.push(this.cards[this.randomIndex()]);
      this.playerScore += this.Cardvalue[this.cards.indexOf(this.playerHand[0])];
      this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[0])];
      this.playerHandContainer = this.playerHand.join(' ');
      this.bankerHandContainer = this.bankerHand.join(' ');

      setTimeout(() => {
        this.playerHand.push(this.cards[this.randomIndex()]);
        this.bankerHand.push(this.cards[this.randomIndex()]);
        this.playerScore += this.Cardvalue[this.cards.indexOf(this.playerHand[1])];
        this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[1])];
        this.playerHandContainer = this.playerHand.join(' ');
        this.bankerHandContainer = this.bankerHand.join(' ');

        if (this.playerScore > 9) {
          this.playerScore -= 10;
        }
        if (this.bankerScore > 9) {
          this.bankerScore -= 10;
        }

        setTimeout(() => {
          if (this.playerScore < 6 && this.bankerScore < 8) {
            this.playerHand.push(this.cards[this.randomIndex()]);
            this.playerScore += this.Cardvalue[this.cards.indexOf(this.playerHand[2])];
            this.playerHandContainer = this.playerHand.join(' ');
            if (this.playerScore > 9) {
              this.playerScore -= 10;
            }
            if (this.bankerScore < 3) {
              this.bankerHand.push(this.cards[this.randomIndex()]);
              this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[2])];
              this.bankerHandContainer = this.bankerHand.join(' ');
              if (this.bankerScore > 9) {
                this.bankerScore -= 10;
              }
            } else if (this.bankerScore == 3 && this.playerHand[2] != "8") {
              this.bankerHand.push(this.cards[this.randomIndex()]);
              this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[2])];
              this.bankerHandContainer = this.bankerHand.join(' ');
              if (this.bankerScore > 9) {
                this.bankerScore -= 10;
              }
            } else if (this.bankerScore == 4 && (this.playerHand[2] == "2" || this.playerHand[2] == "3" || this.playerHand[2] == "4" || this.playerHand[2] == "5" || this.playerHand[2] == "6" || this.playerHand[2] == "7")) {
              this.bankerHand.push(this.cards[this.randomIndex()]);
              this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[2])];
              this.bankerHandContainer = this.bankerHand.join(' ');
              if (this.bankerScore > 9) {
                this.bankerScore -= 10;
              }
            } else if (this.bankerScore == 5 && (this.playerHand[2] == "4" || this.playerHand[2] == "5" || this.playerHand[2] == "6" || this.playerHand[2] == "7")) {
              this.bankerHand.push(this.cards[this.randomIndex()]);
              this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[2])];
              this.bankerHandContainer = this.bankerHand.join(' ');
              if (this.bankerScore > 9) {
                this.bankerScore -= 10;
              }
            } else if (this.bankerScore == 6 && (this.playerHand[2] == "6" || this.playerHand[2] == "7")) {
              this.bankerHand.push(this.cards[this.randomIndex()]);
              this.bankerScore += this.Cardvalue[this.cards.indexOf(this.bankerHand[2])];
              this.bankerHandContainer = this.bankerHand.join(' ');
              if (this.bankerScore > 9) {
                this.bankerScore -= 10;
              }
            }
          }
          this.evaluateWinner();
        }, 1500);
      }, 1500);
    }, 1500);
  }

  evaluateWinner() {
    if (this.playerbetplayer == true) {
      if (this.playerScore > this.bankerScore) {
        this.money += this.playerMoney * 2;
        this.money = parseFloat(this.money.toFixed(2))
        this.result = 'Player wins!';
      } else if (this.playerScore < this.bankerScore) {
        this.result = 'Banker wins!';
      } else {
        this.money += this.playerMoney ;
        this.money = parseFloat(this.money.toFixed(2))
        this.result = 'Tie!';
      }
      this.result += " You bet player";
    } else if (this.playerbettie == true) {
      if (this.playerScore == this.bankerScore) {
        this.money += this.tieMoney * 8;
        this.money = parseFloat(this.money.toFixed(2))
        this.result = 'Tie!';
      } else {
        this.result = 'Banker wins!';
      }
      this.result += " You bet tie";
    } else if (this.playerbetbanker == true) {
      if (this.playerScore > this.bankerScore) {
        this.result = 'Player wins!';
      } else if (this.playerScore < this.bankerScore) {
        this.money += this.bankerMoney * (1 + (19/20));
        this.money = parseFloat(this.money.toFixed(2))
        this.result = 'Banker wins!';
      } else {
        this.money += this.bankerMoney;
        this.money = parseFloat(this.money.toFixed(2))
        this.result = 'Tie!';
      }
      this.result += " You bet banker";
    }
    this.gameOver = true; 
    this.gameStarted = false;
    this.appComponent.kaska = parseFloat(this.money.toFixed(2));
  }

  replayGame() {
   
    this.playerHand = [];
    this.bankerHand = [];
    this.playerScore = 0;
    this.bankerScore = 0;
    this.playerHandContainer = '';
    this.bankerHandContainer = '';
    this.result = '';
    this.playerMoney = 0;
    this.tieMoney = 0;
    this.bankerMoney = 0;
    this.gameOver = false; 
  }


   toggleSidebar() {
    const sidebar = document.getElementById("sidebar") as HTMLElement;
    if (sidebar.style.width === "310px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "310px";
    }
}
}
