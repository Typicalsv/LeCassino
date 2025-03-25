import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blackjack',
  imports: [CommonModule, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent {

  ngOnInit() {
    
    document.addEventListener("DOMContentLoaded", function() {  
      const karty: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const value: number[] = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 10, 10, 10, 11];
      const newH1: HTMLHeadingElement = document.createElement("h1");
      const newH2: HTMLHeadingElement = document.createElement("h1");
      const stawka: HTMLElement | null = document.getElementById("stawka");
     const kasa: HTMLInputElement | null = document.getElementById("kasa") as HTMLInputElement;
      const skarbonka: HTMLElement | null = document.getElementById("skarbonka");
      const buttonContainer = document.getElementById("buttonContainer") as HTMLElement;
      const wynik = document.getElementById("wynik") as HTMLElement;

      
        const buttonHit: HTMLButtonElement = document.createElement("button");
        const buttonStand: HTMLButtonElement = document.createElement("button");
        const buttonReplay: HTMLButtonElement = document.createElement("button");
        const buttonStart: HTMLButtonElement = document.createElement("button");
        const buttonSplit: HTMLButtonElement = document.createElement("button");
        const buttonDouble: HTMLButtonElement = document.createElement("button");

        applyStyles(buttonHit);
        applyStyles(buttonStand);
        applyStyles(buttonReplay);
        applyStyles(buttonStart);
        applyStyles(buttonSplit);
        applyStyles(buttonDouble);

        
      
      

      function applyStyles(button: HTMLButtonElement) {
        // Apply styles directly to the button
        button.style.backgroundColor = '#4CAF50'; // Background color
        button.style.width = '120px';
        button.style.height = '50px'; // Height (integer with px unit)
        button.style.color = 'white'; // Text color
        button.style.borderRadius = '10px'; // Border radius (integer with px unit)
        button.style.outline = 'none'; // Remove outline
        button.style.border = '1px solid white'; // Border (1px solid white)
        button.style.margin = '5px'; // Add some spacing between buttons
        button.style.fontSize = '16px'; 
      }

       
      newH1.id = "h1";
      newH2.id = "h2";
      buttonHit.textContent = "HIT";
      buttonHit.id = "hit";
      buttonHit.onclick = function() { hit() };
      buttonStand.textContent = "STAND";
      buttonStand.id = "stand";
      buttonStand.onclick = function() { stand() };
      buttonReplay.textContent = "REPLAY";
      buttonReplay.id = "replay";
      buttonReplay.onclick = function() { replay() };
      buttonStart.id = "start";
      buttonStart.textContent = "START GAME";
      buttonStart.onclick = function() { START() };
      buttonSplit.id = "split";
      buttonSplit.textContent = "SPLIT";
      buttonSplit.onclick = function() { split() };
      buttonDouble.id = "double";
      buttonDouble.textContent = "DOUBLE";
      buttonDouble.onclick = function() { double() };
  
      let playerHand: string[] = [];      
      let dealerHand: string[] = [];     
      let handValue: number = 0;
      let dealerHandValue: number = 0;
      let liczydlo: number = 0;
      let liczydlo1: number = 0;
      let liczydlo2: number = 0;
      let liczydlod: number = 0;
      let ifsplit: boolean = false;
      let ifdouble: boolean = false;
      let ifblackjack: boolean = false;
      let ifblackjack1: boolean = false;
      let ifblackjack2: boolean = false;
      let hand1: string[] = [];
      let hand2: string[] = [];
      let handValue1: number = 0;
      let handValue2: number = 0;
      let kasa_w_skarbonce: number = 1000;
  
      if (kasa) {
          let stawkaLiczba: number = parseFloat(kasa.value);
          if (skarbonka) {
              skarbonka.textContent = kasa_w_skarbonce.toString();
          }
      } 
  
      function START() {
          if (kasa) {
              const stake: number = parseFloat(kasa.value);
              if (stake > 0 && kasa_w_skarbonce - stake >= 0) {
                  generateCards();
                  generateDealerCards();
                  if (newH1) {
                      newH1.remove();
                  }
  
                  if (stawka) {
                      stawka.textContent = "STAWKA: " + stake;
                  }
                  kasa_w_skarbonce -= stake;
                  if (skarbonka) {
                      skarbonka.textContent = kasa_w_skarbonce.toString();
                  }
  
                  document.getElementById("Karty")!.innerHTML = `Hand: ${playerHand.join(" ")}`;
                  document.getElementById("Wartość")!.innerHTML = `Hand Value: ${handValue}`;
                  document.getElementById("KartyD")!.innerHTML = `Dealer Hand: ${dealerHand[0]}`;
                  document.getElementById("WartośćD")!.innerHTML = `Dealer Hand Value: ${value[karty.indexOf(dealerHand[0])]}`;
  
                  buttonContainer.append(buttonHit);
                  buttonContainer.append(buttonStand);
                  buttonContainer.append(buttonDouble);
  
                  document.getElementById("start")!.remove();
  
                  if (handValue == 21) {
                      newH1.textContent = "BLACKJACK";
                      wynik.append(newH1);
                      ifblackjack = true;
                      stand();
                  }
  
                  if (playerHand.length === 2 && playerHand[0] === playerHand[1]) {
                      buttonContainer.append(buttonSplit);
                  }
              } else if (stake <= 0) {
                  newH1.remove();
                  newH1.textContent = "MUSISZ WEJŚĆ ZA CO NAJMNIEJ 1";
                  wynik.append(newH1);
              } else if (kasa_w_skarbonce - stake < 0) {
                  newH1.remove();
                  newH1.textContent = "NIE MOŻESZ WEJŚĆ ZA WIECEJ NIŻ MASZ PIENIĘDZY";
                  wynik.append(newH1);
              }
          }
      }
      (window as any).START = START;
  
      function generateCards() {
          for (let i = 0; i < 2; i++) {
              const randomIndex = Math.floor(Math.random() * karty.length);
              playerHand.push(karty[randomIndex]);
              handValue += value[randomIndex];
          }
          if (playerHand.includes("A")) {
              handValue += 10;
          }
      }
  
      function generateDealerCards() {
          for (let i = 0; i < 1; i++) {
              const randomIndex = Math.floor(Math.random() * karty.length);
              dealerHand.push(karty[randomIndex]);
              if (karty[randomIndex] === 'A' && dealerHandValue + 11 <= 21) {
                  dealerHandValue += 11;
              } else {
                  dealerHandValue += value[randomIndex];
              }
          }
      }
  
      function hit() {
          const randomIndex = Math.floor(Math.random() * karty.length);
  
          
          if (ifsplit) {
              splitHitOne();
          } else {
              if (playerHand.includes("A") && handValue + 11 > 21 && randomIndex == 0 && liczydlo == 0) {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[randomIndex];
                  liczydlo++;
                 
              } else if (playerHand.includes("A") && handValue + value[randomIndex] > 21 && liczydlo == 0) {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[randomIndex] - 10;
                  liczydlo++;
                 
              } else if (randomIndex == 0 && playerHand.includes("A") && liczydlo == 1) {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[randomIndex];
              } else if (randomIndex == 0 && handValue + 11 <= 21) {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[randomIndex];
              } else if (randomIndex == 0 && handValue + 11 <= 21) {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[13];
              } else {
                  playerHand.push(karty[randomIndex]);
                  handValue += value[randomIndex];
              }
  
              document.getElementById("Karty")!.innerHTML = `Hand: ${playerHand.join(" ")}`;
              document.getElementById("Wartość")!.innerHTML = `Hand Value: ${handValue}`;
  
              if (handValue > 21) {
                  newH1.textContent = "YOU LOSE";
                  wynik.append(newH1);
                  document.getElementById("stand")!.remove();
                  document.getElementById("hit")!.remove();
                  buttonDouble.remove();
                  buttonSplit.remove();
                  wynik.append(buttonReplay);
              }
          }
  
          if (document.getElementById("split")) {
              document.getElementById("split")!.remove();
          }
      }
      function updateSkarbonka() {
        if (skarbonka) {
            skarbonka.textContent = kasa_w_skarbonce.toString();
        }
    }
    
    
    function stand() {
        let intervalID = setInterval(() => {
            if (dealerHandValue < 17) {
                const randomIndex = Math.floor(Math.random() * karty.length);
    
                if (dealerHand.includes("A") && dealerHandValue + 11 > 21 && randomIndex == 0 && liczydlod == 0) {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[randomIndex];
                    liczydlod++;
                   
                } else if (dealerHand.includes("A") && dealerHandValue + value[randomIndex] > 21 && liczydlod == 0) {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[randomIndex] - 10;
                    liczydlod++;
                    
                } else if (randomIndex == 0 && dealerHand.includes("A") && liczydlod == 1) {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[randomIndex];
                } else if (randomIndex == 0 && dealerHandValue + 11 > 21 && liczydlo == 0) {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[randomIndex];
                    liczydlo++;
                } else if (randomIndex == 0 && dealerHandValue + 11 <= 21) {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[13];
                } else {
                    dealerHand.push(karty[randomIndex]);
                    dealerHandValue += value[randomIndex];
                }
    
                document.getElementById("KartyD")!.innerHTML = `Dealer Hand: ${dealerHand.join(" ")}`;
                document.getElementById("WartośćD")!.innerHTML = `Dealer Hand Value: ${dealerHandValue}`;
    
            } else {
                clearInterval(intervalID);
    
                if (ifsplit) {
                   buttonContainer.append(buttonReplay);
                    if (ifblackjack1) {
                        newH1.textContent = "BLACKJACK";
                        kasa_w_skarbonce += (parseFloat(kasa!.value) * 2.5);
                        updateSkarbonka();
                        
                    } else if (handValue1 > 21) {
                        newH1.textContent = "HAND ONE BUST";
                    } else if (dealerHandValue > 21 || handValue1 > dealerHandValue) {
                        newH1.textContent = "HAND ONE WIN";
                        kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                        updateSkarbonka();
                        
                    } else if (dealerHandValue > handValue1) {
                        newH1.textContent = "HAND ONE LOSE";
                    } else {
                        newH1.textContent = "HAND ONE PUSH";
                        kasa_w_skarbonce += parseFloat(kasa!.value);
                        updateSkarbonka();
                    }
                    wynik.append(newH1);
                    if (ifblackjack2) {
                        newH2.textContent = "BLACKJACK";
                        kasa_w_skarbonce += (parseFloat(kasa!.value) * 2.5);
                        updateSkarbonka();
                        
                    } else if (handValue2 > 21) {
                        newH2.textContent = "HAND TWO BUST";
                    } else if (dealerHandValue > 21 || handValue2 > dealerHandValue) {
                        newH2.textContent = "HAND TWO WIN";
                        kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                        updateSkarbonka();
                        
                    } else if (dealerHandValue > handValue2) {
                        newH2.textContent = "HAND TWO LOSE";
                    } else {
                        newH2.textContent = "HAND TWO PUSH";
                        kasa_w_skarbonce += parseFloat(kasa!.value);
                        updateSkarbonka();
                    }
                    wynik.append(newH2);
    
                    buttonContainer.append(buttonReplay);
                } else {
                    buttonContainer.append(buttonReplay);
                    if (ifdouble) {
                        
                        if (dealerHandValue > 21) {
                            newH1.textContent = "DEALER BUST";
                            kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                            updateSkarbonka();
                            
                        } else if (handValue > dealerHandValue) {
                            newH1.textContent = "YOU WIN";
                            kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                            updateSkarbonka();
                            
                        }else if(handValue == dealerHandValue){
                            newH1.textContent = "PUSH";
                            kasa_w_skarbonce += (parseFloat(kasa!.value) * 1);
                            updateSkarbonka();
                        } 
                        else {
                            wynik.append(newH1);
                            buttonContainer.append(buttonReplay);
                        }
                    } else {
                        buttonContainer.append(buttonReplay);
                        if (ifblackjack) {
                            newH1.textContent = "BLACKJACK";
                            kasa_w_skarbonce += (parseFloat(kasa!.value) * 2.5);
                            updateSkarbonka();
                            
                        }else{
                            if (dealerHandValue > 21) {
                                newH1.textContent = "DEALER BUST";
                                kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                                updateSkarbonka();
                              
                            } else if (handValue > dealerHandValue) {
                                newH1.textContent = "YOU WIN";
                                kasa_w_skarbonce += (parseFloat(kasa!.value) * 2);
                                updateSkarbonka();
                                
                            }else if(handValue == dealerHandValue){
                                newH1.textContent = "PUSH";
                                kasa_w_skarbonce += (parseFloat(kasa!.value) * 1);
                                updateSkarbonka();
                            } 
                            else {
                                newH1.textContent = "YOU LOSE";
                                wynik.append(newH1);
                            }
                        }
                    }
                }
            }
        }, 1000);
    
        buttonDouble.remove();
        document.getElementById("stand")!.remove();
        document.getElementById("hit")!.remove();
        
    }
    
    // Call updateSkarbonka in other relevant places
    function replay() {
        document.getElementById("KartyD")!.innerHTML = ``;
        document.getElementById("WartośćD")!.innerHTML = ``;
        document.getElementById("Karty")!.innerHTML = ``;
        document.getElementById("Wartość")!.innerHTML = ``;
        buttonContainer.append(buttonStart);
        if (document.getElementById("h1")) {
            document.getElementById("h1")!.remove();
        }
        if (newH2) {
            newH2.remove();
        }
        buttonReplay.remove();
        handValue1 = 0;
        handValue2 = 0;
        hand1 = [];
        hand2 = [];
        liczydlo1 = 0;
        liczydlo2 = 0;
        liczydlod = 0;
        handValue = 0;
        dealerHandValue = 0;
        playerHand = [];
        dealerHand = [];
        ifsplit = false;
        ifdouble = false;
        ifblackjack = false;
        ifblackjack1 = false;
        ifblackjack2 = false;
        if (stawka) {
            stawka.textContent = "STAWKA: ";
        }
    
        buttonHit.onclick = function() { hit() };
        updateSkarbonka();
    }
  
      function split() {
        if (kasa) {
        const stake = parseFloat(kasa.value);
        kasa_w_skarbonce -= stake;
          if (playerHand.length === 2 && playerHand[0] === playerHand[1]) {
              ifsplit = true;
              hand1 = [playerHand[0]];
              hand2 = [playerHand[1]];
              handValue1 = value[karty.indexOf(playerHand[0])];
              handValue2 = value[karty.indexOf(playerHand[1])];
              playerHand = [];
              handValue = 0;
              document.getElementById("Karty")!.innerHTML = `Hand 1: ${hand1.join(" ")} | Hand 2: ${hand2.join(" ")}`;
              document.getElementById("Wartość")!.innerHTML = `Hand 1 Value: ${handValue1} | Hand 2 Value: ${handValue2}`;
          }
          if (stawka) {
            stawka.textContent = "STAWKA: " + (stake * 2);
        }
        if (skarbonka) {
          skarbonka.textContent = kasa_w_skarbonce.toString();
      }
          document.getElementById("split")!.remove();
          buttonStand.onclick = function() {buttonHit.onclick = function() {splitHitTwo()}}
      }
    }
  
  
      function splitHitOne() {
          const randomIndex = Math.floor(Math.random() * karty.length);
          if (hand1.includes("A") && handValue1 + 11 > 21 && randomIndex == 0 && liczydlo1 == 0) {
            hand1.push(karty[randomIndex]);
            handValue1 += value[randomIndex];
            liczydlo1++;
        } else if (hand1.includes("A") && handValue1 + value[randomIndex] > 21 && liczydlo1 == 0) {
            hand1.push(karty[randomIndex]);
            handValue1 += value[randomIndex] - 10;
            liczydlo1++;
        } else if (randomIndex == 0 && hand1.includes("A") && liczydlo1 == 1) {
            hand1.push(karty[randomIndex]);
            handValue1 += value[randomIndex];
        } else if (randomIndex == 0 && handValue1 + 11 <= 21) {
            hand1.push(karty[randomIndex]);
            handValue1 += value[13];
        } else {
            hand1.push(karty[randomIndex]);
            handValue1 += value[randomIndex];
        }
    
        if(handValue1 > 21){
            newH1.textContent = "YOU LOSE HAND 1";
            wynik.append(newH1);
            buttonHit.onclick = function() {splitHitTwo()}
        } 
        if(handValue1 == 21){
            ifblackjack1 = true;
            buttonHit.onclick = function() {splitHitTwo()}
        }
        document.getElementById("Karty")!.innerHTML = `Hand 1: ${hand1.join(" ")} | Hand 2: ${hand2.join(" ")}`;
        document.getElementById("Wartość")!.innerHTML = `Hand 1 Value: ${handValue1} | Hand 2 Value: ${handValue2}`;
      }
  
      function splitHitTwo() {
        const randomIndex = Math.floor(Math.random() * karty.length);
        const card = karty[randomIndex];
        const cardValue = value[randomIndex];
    
        if (hand2.includes("A") && handValue2 + 11 > 21 && randomIndex == 0 && liczydlo2 == 0) {
            hand2.push(card);
            handValue2 += cardValue - 10;
            liczydlo2++;
        } else if (hand2.includes("A") && handValue2 + cardValue > 21 && liczydlo2 == 0) {
            hand2.push(card);
            handValue2 += cardValue - 10;
            liczydlo2++;
        } else if (randomIndex == 0 && hand2.includes("A") && liczydlo2 == 1) {
            hand2.push(card);
            handValue2 += cardValue;
        } else if (randomIndex == 0 && handValue2 + 11 <= 21) {
            hand2.push(card);
            handValue2 += value[13];
        } else {
            hand2.push(card);
            handValue2 += cardValue;
        }
    
        if (handValue2 > 21) {
            newH2.textContent = "HAND TWO BUST";
            wynik.append(newH2);
            stand();
        } else {
            buttonStand.onclick = function() { stand() }
        }
    
        document.getElementById("Karty")!.innerHTML = `Hand 1: ${hand1.join(" ")} | Hand 2: ${hand2.join(" ")}`;
        document.getElementById("Wartość")!.innerHTML = `Hand 1 Value: ${handValue1} | Hand 2 Value: ${handValue2}`;
    }
      
      
  
      function double() {
          if (kasa) {
              const stake = parseFloat(kasa.value);
              const randomIndex = Math.floor(Math.random() * karty.length);
      
              // Add the card to the player's hand
              playerHand.push(karty[randomIndex]);
              handValue += value[randomIndex];
      
              // Check if the hand value exceeds 21 and adjust for Ace
              if (handValue > 21 && playerHand.includes('A')) {
                  handValue -= 10;
              }
      
              document.getElementById("Karty")!.innerHTML = `Hand: ${playerHand.join(" ")}`;
              document.getElementById("Wartość")!.innerHTML = `Hand Value: ${handValue}`;
      
              ifdouble = true;
              kasa_w_skarbonce -= stake;
              if (stawka) {
                  stawka.textContent = "STAWKA: " + (stake * 2);
              }
              if (skarbonka) {
                  skarbonka.textContent = kasa_w_skarbonce.toString();
              }
      
              if (handValue > 21) {
                  newH1.textContent = "YOU LOST";
                  wynik.append(newH1);
                  buttonHit.remove();
                  buttonStand.remove();
                  buttonDouble.remove();
                  buttonContainer.append(buttonReplay);
              } else {
                  stand();
              }
          }
      }
  
  });
}
}
