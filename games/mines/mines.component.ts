import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mines',
  imports: [CommonModule, FormsModule],
  templateUrl: './mines.component.html',
  styleUrl: './mines.component.css'
})
export class MinesComponent {

  liczbamin:number=2;
  liczbaRund:number=10;
  usedIndices: Set<number> = new Set<number>(); 
  autoIndices: number[] = [];
  kliknieteMiny: Set<number> = new Set<number>();
  ifstarted: boolean = false;
  ifreplay: boolean = false;
  ifauto: boolean = false;
  ifcanauto: boolean = false;
  ifautostarted: boolean = false;
  automineopened: boolean = false;
  ifcanstop: boolean = false;
  pozostale: number = 16 - this.liczbamin;
  otwarte: number = 0;
  szansa: number = 0;
  ryzyko: number = 0;
  kwota: string = "10.00"; 
  kwotafr: number = Number(this.kwota)
  iloscOdkrytych: number =0;
  aktualnaWygrana: number =0;
  hajs: number = 10000.00;
  iloscZielonych: number = 0;

  

  calculateMultiplier(): number {
   
    if(this.iloscOdkrytych == 1 && this.liczbamin == 2){
      const probabilityOfMine = 0.097;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }
    else if(this.iloscOdkrytych == 1 && this.liczbamin == 3){
      const probabilityOfMine = 0.181;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }
    else if(this.iloscOdkrytych == 1 && this.liczbamin == 4){
      const probabilityOfMine = 0.280;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }
    else if(this.iloscOdkrytych == 1 && this.liczbamin == 5){
      const probabilityOfMine = 0.396;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 6){
      const probabilityOfMine = 0.536;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 7){
      const probabilityOfMine = 0.706;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 8){
      const probabilityOfMine = 0.920;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 9){
      const probabilityOfMine = 1.194;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 10){
      const probabilityOfMine = 1.56;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 11){
      const probabilityOfMine = 2.072;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 12){
      const probabilityOfMine = 2.84;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 13){
      const probabilityOfMine = 4.12
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 14){
      const probabilityOfMine = 6.68;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }else if(this.iloscOdkrytych == 1 && this.liczbamin == 15){
      const probabilityOfMine = 14.36;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }
    else{
      const probabilityOfMine = this.liczbamin / this.pozostale ;
      const multiplier = 1 + (probabilityOfMine); 
      return multiplier;
    }
      
    
    

   
}

  plus(){

    console.log(this.ifstarted, this.ifautostarted)
    if(!this.ifstarted && !this.ifautostarted){

      
      if(this.liczbamin < 15){
        this.liczbamin++;
        this.pozostale = 16 - this.liczbamin;
      }
    }
    
  }

  minus(){

    console.log(this.ifstarted, this.ifautostarted)

  if(!this.ifstarted && !this.ifautostarted){


    if(this.liczbamin - 1 >= 2){
      this.liczbamin--;
      this.pozostale = 16 - this.liczbamin;
    }
  }
    
  
    
  }


  resetGame() {
    this.gameCount = 0;
    this.iloscOdkrytych = 0;
    this.liczbaRund = 10
    this.kwotafr = Number(this.kwota);
    this.ifstarted = false;
    this.ifautostarted = false;
    this.ifreplay = false;
    
    this.ryzyko = 0;
    this.otwarte = 0;
    this.szansa = 0;
    this.pozostale = 16 - this.liczbamin;
    this.usedIndices.clear();
    this.autoIndices = [];
    this.automineopened = false;
    this.ifcanstop = false;
    this.kliknieteMiny.clear();
    console.log(this.ifcanstop)
    for (let skibidiIndex = 1; skibidiIndex <= 16; skibidiIndex++) {
      const minaSkibidi = document.getElementById('mine' + skibidiIndex) as HTMLElement;
      minaSkibidi.style.background = 'grey';
    }
  }



  gameCount = 0; // Track how many times the game has run

  startauto() {

    this.ifcanstop = true;

    if (this.liczbaRund == 0) {
      for (let skibidiIndex = 1; skibidiIndex <= 16; skibidiIndex++) {
          const minaSkibidi = document.getElementById('mine' + skibidiIndex) as HTMLElement;
          minaSkibidi.style.background = 'grey';
      }
      this.resetGame()
      return;
  }

  console.log(`Starting game round ${this.gameCount + 1}`);
  console.log(this.autoIndices);

  // **RESET MULTIPLIER AMOUNT** BEFORE STARTING NEW ROUND
  this.kwotafr = Number(this.kwota);  // Ensures kwotafr starts fresh each round

  for (let skibidiIndex = 1; skibidiIndex <= 16; skibidiIndex++) {
      const minaSkibidi = document.getElementById('mine' + skibidiIndex) as HTMLElement;

      if ((minaSkibidi.style.background == 'red' || minaSkibidi.style.background == 'rgb(160, 160, 255)') && this.autoIndices.includes(skibidiIndex)) {
          minaSkibidi.style.background = "green";
      }

      if (minaSkibidi.style.background == 'rgb(160, 160, 255)' || minaSkibidi.style.background == 'red') {
          minaSkibidi.style.background = 'grey';
      } else if (minaSkibidi.style.background == 'blue') {
          minaSkibidi.style.background = 'green';
      }
  }
  
    if (this.ifauto) {
      if (this.iloscZielonych >= 1) {


        this.liczbaRund--;

        this.ifautostarted = true;
        this.ifstarted = true;
        this.usedIndices.clear();
        this.hajs -= Number(this.kwota);
        this.iloscOdkrytych = 0; // Reset before starting new round
  
        for (let i = 0; i < this.liczbamin; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * 16) + 1;
          } while (this.usedIndices.has(randomIndex));
  
          this.usedIndices.add(randomIndex);
        }
  
        let timeouts: Array<ReturnType<typeof setTimeout>> = [];
        let hitMine = false;
  
        for (let autoindex = 0; autoindex < this.autoIndices.length; autoindex++) {
          const timeoutId = setTimeout(() => {
            if (hitMine) return;
  
            const mina = document.getElementById('mine' + this.autoIndices[autoindex]) as HTMLElement;
            if (this.usedIndices.has(this.autoIndices[autoindex])) {
              mina.style.background = 'red';
              this.automineopened = true;
              
              hitMine = true;

              


              console.log("Before mine hit, kwotafr:", this.kwotafr);
              this.kwotafr = Number(this.kwota);
              console.log("After mine hit, kwotafr reset to:", this.kwotafr);


              this.ryzyko = 0;
              this.otwarte = 0;
              this.szansa = 0;
              this.pozostale = 16 - this.liczbamin;
  
              for (let skibidiIndex = 1; skibidiIndex <= 16; skibidiIndex++) {
                const minaSkibidi = document.getElementById('mine' + skibidiIndex) as HTMLElement;
                if (this.usedIndices.has(skibidiIndex)) {
                  minaSkibidi.style.background = 'red';
                } else if (minaSkibidi.style.background === 'grey' || minaSkibidi.style.background === 'green') {
                  minaSkibidi.style.background = 'rgb(160, 160, 255)';
                }
              }
  
              timeouts.forEach(clearTimeout);
              this.automineopened = false; // Reset automine flag
              
              this.gameCount++;
  
              if (this.liczbaRund > 0 && this.hajs - Number(this.kwota) >= 0) {
                setTimeout(() => this.startauto(), 3000);
              } else {
                console.log("All rounds completed!");

                setTimeout(() => this.resetGame(), 3000)
              }
            } else {
              mina.style.background = 'blue';
              this.pozostale -= 1;
  
              // Only increase `iloscOdkrytych` if mine was not red
              if (!this.usedIndices.has(this.autoIndices[autoindex])) {
                this.iloscOdkrytych++;
              }
  
              const multiplier = this.calculateMultiplier();
              console.log(multiplier)
              this.kwotafr *= multiplier;
              this.updateZbierzButton();
  
              if (this.iloscOdkrytych === this.autoIndices.length) {
                this.hajs = Math.round((this.hajs + Number(this.kwotafr.toFixed(2))) * 100) / 100;
                this.kwotafr = Number(this.kwota);
                
                
                this.ifreplay = true;
                
                this.ryzyko = 0;
                this.otwarte = 0;
                this.szansa = 0;
                this.pozostale = 16 - this.liczbamin;
  
                for (let skibidiIndex = 1; skibidiIndex <= 16; skibidiIndex++) {
                  const minaSkibidi = document.getElementById('mine' + skibidiIndex) as HTMLElement;
                  if (this.usedIndices.has(skibidiIndex)) {
                    minaSkibidi.style.background = 'red';
                  } else if (minaSkibidi.style.background === 'grey') {
                    minaSkibidi.style.background = 'rgb(160, 160, 255)';
                  }
                }
                
                this.gameCount++;
                
                if (this.liczbaRund > 0 && this.hajs - Number(this.kwota) >= 0) {
                  setTimeout(() => this.startauto(), 3000);
                } else {
                  
                  console.log("All rounds completed!");
                
                  setTimeout(() => this.resetGame(), 3000)

                }
              }
            }
          }, 500 * autoindex);
          timeouts.push(timeoutId);
        }
      }
    }
  }
  
  
  start() {
    if (this.hajs - Number(this.kwota) >= 0 && !this.ifstarted) {

      for (let i = 1; i <= 16; i++) {
        const mina = document.getElementById('mine' + i) as HTMLElement;
        if (mina.style.background != 'green') {
          mina.style.background = 'grey';
        }
      }
  
      if (this.ifauto) {
        if (this.iloscZielonych >= 1) {
          this.ifautostarted = true;
          this.ifstarted = true;
          this.gameCount = 0; 
          this.startauto();
        }
      }
    
      

      else if(this.ifreplay){


      


      
        for(let i = 1; i <= 16; i++){
         const mina = document.getElementById('mine' + i) as HTMLElement;
         mina.style.background = 'grey';
         mina.innerText = ""+i;
         
          
        }
        this.usedIndices.clear();
        this.hajs -= Number(this.kwota);

        for (let i = 0; i < this.liczbamin; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * 16) + 1;
          } while (this.usedIndices.has(randomIndex));
    
          this.usedIndices.add(randomIndex);
        }

        
       }else {
        this.usedIndices.clear();
        this.hajs -= Number(this.kwota);

        for (let i = 0; i < this.liczbamin; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * 16) + 1;
          } while (this.usedIndices.has(randomIndex));
    
          this.usedIndices.add(randomIndex);
    
          
        }
       }
       


       this.ifstarted = true
      }
    
      
    }

  onNumberClick(number: number): void {
  
    if(this.ifstarted && !this.ifautostarted) {
      if(this.kliknieteMiny.has(number) == false){

      this.kliknieteMiny.add(number);
      console.log(this.kliknieteMiny)
      this.iloscOdkrytych++;
      const multiplier = this.calculateMultiplier();
  
      this.kwotafr *= multiplier;
      console.log(this.kwotafr, multiplier);
  
      const mina = document.getElementById('mine' + number) as HTMLElement;
  
      if (this.usedIndices.has(number)) {
        mina.innerText = 'BOOM';
        mina.style.background = 'red';
        this.ifstarted = false;
        this.ifreplay = true;
        this.kliknieteMiny.clear()
        this.ryzyko = 0;
        this.otwarte = 0;
        this.szansa = 0;
        this.pozostale = 16 - this.liczbamin;
        this.kwotafr = Number(this.kwota);
        this.iloscOdkrytych = 0;
  
        for (let i = 1; i <= 16; i++) {
          const mina = document.getElementById('mine' + i) as HTMLElement;
          if (this.usedIndices.has(i)) {
            mina.innerText = 'BOOM';
            mina.style.background = 'red';
          } else {
            if (mina.innerText != "SAFE") {
              mina.style.background = 'rgb(160, 160, 255)';
            }
            mina.innerText = 'SAFE';
          }
        }
      } else {
        mina.innerText = 'SAFE';
        mina.style.background = 'blue';
        this.pozostale -= 1;
        this.otwarte++;
        this.szansa = Math.round((this.pozostale / (16 - this.otwarte)) * 100);
        this.ryzyko = 100 - this.szansa;
  
        this.iloscOdkrytych++;
        this.updateZbierzButton();
      }
    }
    }
  



  if(this.ifauto && !this.ifstarted){
    if(this.kliknieteMiny.has(number) == false){

      this.kliknieteMiny.add(number);
    const mina = document.getElementById('mine' + number) as HTMLElement;
    const start = document.getElementById('autoStart') as HTMLElement;

    mina.style.background = 'green';
    this.autoIndices.push(number)
    console.log(this.autoIndices)
    this.iloscZielonych++;
    if(this.iloscZielonych >= 1){
      start.style.background = 'green';
    }
  }
  }

}

  
  zbierz(){
    this.hajs = Math.round((this.hajs + Number(this.kwotafr.toFixed(2))) * 100) / 100;
      this.kwotafr = Number(this.kwota);
      
      
      this.ifreplay = true;
      this.liczbamin = 2;
      this.ryzyko = 0;
      this.otwarte = 0;
      this.szansa = 0;
      this.pozostale = 16 - this.liczbamin
      this.iloscOdkrytych = 0;
      console.log(this.kwotafr)
      this.kliknieteMiny.clear()
      

      for (let i = 1; i <= 16; i++) {
        const mina = document.getElementById('mine' + i) as HTMLElement;
        if (this.usedIndices.has(i)) {
          mina.innerText = 'BOOM';
          mina.style.background = 'red';
        } else {
          if (mina.innerText != "SAFE") {
            mina.style.background = 'rgb(160, 160, 255)';
          }
          mina.innerText = 'SAFE';
        }
      }
      this.usedIndices.clear();


      setTimeout(() => this.clearMine(), 2000)
      
      this.ifstarted = false;
    console.log(this.ifstarted)
  }


  clearMine(){
    if(!this.ifstarted){

    
    for(let i = 1; i <= 16; i++){
      const mina = document.getElementById('mine' + i) as HTMLElement;
      mina.style.background = 'grey'
      mina.innerText = '' + i
      }
    }
  }


  minusKasa(){
    if(!this.ifstarted && !this.ifautostarted){

      

      let kwota_number = Number(this.kwota);
      if(kwota_number == 2500){
        this.kwota = "1500.00"
      }else if(kwota_number == 1500){
        this.kwota = "1000.00"
      }else if(kwota_number == 1000){
        this.kwota = "750.00"
      }else if(kwota_number == 750){
        this.kwota = "500.00"
      }else if(kwota_number == 500){
        this.kwota = "250.00"
      }else if(kwota_number == 250){
        this.kwota = "100.00"
      }else if(kwota_number == 100){
        this.kwota = "75.00"
      }else if(kwota_number == 75){
        this.kwota = "50.00"
      }else if(kwota_number == 50){
        this.kwota = "40.00"
      }else if(kwota_number == 40){
        this.kwota = "25.00"
      }else if(kwota_number == 25){
        this.kwota = "20.00"
      }else if(kwota_number==20){
        this.kwota = "15.00"
      }else if(kwota_number==15){
        this.kwota = "12.50"
      }else if(kwota_number==12.5){
        this.kwota = "10.00"
      }else if(kwota_number==10){
        this.kwota = "7.50"
      }else if(kwota_number==7.5){
        this.kwota = "5.00"
      }else if(kwota_number==5){
        this.kwota = "4.00"
      }else if(kwota_number==4){
        this.kwota = "3.00"
      }else if(kwota_number==3){
        this.kwota = "2.50"
      }else if(kwota_number==2.5){
        this.kwota = "2.00"
      }else if(kwota_number==2){
        this.kwota = "1.50"
      }else if(kwota_number==1.5){
        this.kwota = "1.00"
      }else if(kwota_number==1){
        this.kwota = "0.50"
      }
      kwota_number = Number(this.kwota)
      this.kwotafr = kwota_number
      console.log(this.kwotafr)
    }
    
  }

  plusKasa(){
    if(!this.ifstarted && !this.ifautostarted){

      


      let kwota_number = Number(this.kwota);
      if(kwota_number == 1500){
        this.kwota = "2500.00"
      }else if(kwota_number == 1000){
        this.kwota = "1500.00"
      }else if(kwota_number == 750){
        this.kwota = "1000.00"
      }else if(kwota_number == 500){
        this.kwota = "750.00"
      }else if(kwota_number == 250){
        this.kwota = "500.00"
      }else if(kwota_number == 100){
        this.kwota = "250.00"
      }else if(kwota_number == 75){
        this.kwota = "100.00"
      }else if(kwota_number == 50){
        this.kwota = "75.00"
      }else if(kwota_number == 40){
        this.kwota = "50.00"
      }else if(kwota_number == 25){
        this.kwota = "40.00"
      }else if(kwota_number == 20){
        this.kwota = "25.00"
      }else if(kwota_number==15){
        this.kwota = "20.00"
      }else if(kwota_number==12.5){
        this.kwota = "15.00"
      }else if(kwota_number==10){
        this.kwota = "12.50"
      }else if(kwota_number==7.5){
        this.kwota = "10.00"
      }else if(kwota_number==5){
        this.kwota = "7.50"
      }else if(kwota_number==4){
        this.kwota = "5.00"
      }else if(kwota_number==3){
        this.kwota = "4.00"
      }else if(kwota_number==2.5){
        this.kwota = "3.00"
      }else if(kwota_number==2){
        this.kwota = "2.50"
      }else if(kwota_number==1.5){
        this.kwota = "2.00"
      }else if(kwota_number==1){
        this.kwota = "1.50"
      }else if(kwota_number==.5){
        this.kwota = "1.00"
      }
      kwota_number = Number(this.kwota)
      this.kwotafr = kwota_number
      console.log(this.kwotafr)
    }
    
  }

  updateZbierzButton() {
    const zbierzButton = document.getElementById('zbierz') as HTMLElement;
  
    if (zbierzButton) { // Check if the element exists
      zbierzButton.innerText = `Zbierz (${this.kwotafr.toFixed(2)} zł)`;
    } else {
      console.error("Error: 'zbierz' button not found in the DOM.");
    }
  }

  
  manualPlay(){
    const manual = document.getElementById('manual') as HTMLElement;
    const auto = document.getElementById('auto') as HTMLElement;


    if(!this.ifstarted){

    this.kliknieteMiny.clear();
    this.ifauto = false
    if(!this.ifauto){
      manual.style.background = 'blue';
      auto.style.background = 'navy';
    }else{
      auto.style.background = 'blue';
      manual.style.background = 'navy';
    }
    console.log(this.ifauto);
    for(let i = 1; i <= 16; i++){
      const mina = document.getElementById('mine' + i) as HTMLElement;
      mina.style.background = 'grey';
      mina.innerText = ""+i;
      
      this.autoIndices = [];
     }
    }
  }

  autoPlay(){
    
    const manual = document.getElementById('manual') as HTMLElement;
    const auto = document.getElementById('auto') as HTMLElement;

    if(!this.ifstarted){
      this.kliknieteMiny.clear();
      this.ifauto = true;
    if(!this.ifauto){

      
      manual.style.background = 'blue';
      auto.style.background = 'navy';
    }else{
      auto.style.background = 'blue';
      manual.style.background = 'navy';
    }
    console.log(this.ifauto);
    
    
  }
}

plusRundy(){
  if(!this.ifautostarted){

  

  if(this.liczbaRund == 1){
    this.liczbaRund = 2
  }else if(this.liczbaRund == 2){
    this.liczbaRund = 5
  }else if(this.liczbaRund == 5){
    this.liczbaRund = 10
  }else if(this.liczbaRund == 10){
    this.liczbaRund = 25
  }else if(this.liczbaRund == 25){
    this.liczbaRund = 50
  }else if(this.liczbaRund == 50){
    this.liczbaRund = 100
  }else if(this.liczbaRund == 100){
    this.liczbaRund = 250
  }else if(this.liczbaRund == 250){
    this.liczbaRund = 500
  }else if(this.liczbaRund == 500){
    this.liczbaRund = 1000
  }
}

}
minusRundy(){
  if(!this.ifautostarted){

  


  if(this.liczbaRund == 1000){
    this.liczbaRund = 500
  }else if(this.liczbaRund == 500){
    this.liczbaRund = 250
  }else if(this.liczbaRund == 250){
    this.liczbaRund = 100
  }else if(this.liczbaRund == 100){
    this.liczbaRund = 50
  }else if(this.liczbaRund == 50){
    this.liczbaRund = 25
  }else if(this.liczbaRund == 25){
    this.liczbaRund = 10
  }else if(this.liczbaRund == 10){
    this.liczbaRund = 5
  }else if(this.liczbaRund == 5){
    this.liczbaRund = 2
  }else if(this.liczbaRund == 2){
    this.liczbaRund = 1
  }
}
}


stop(){
  this.liczbaRund = 0;


  const end = document.getElementById('autoEnd') as HTMLElement;


  end.style.background = 'rgb(187, 69, 69)'
}


}