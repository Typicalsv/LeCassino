import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, AppComponent, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

constructor (private app: AppComponent  , private router: Router) { }

hajs: number =0;


checkInputs(event: Event){
  event.preventDefault();
  const error = document.getElementById('Error') as HTMLElement;
  let ifValid = true;
  if(this.hajs <=0 ){
    ifValid = false
    error.textContent = "Środki muszą być wieksze od 0";
  }
  if(ifValid){
    console.log("dziala")
    error.textContent = "";
    this.app.kaska += this.hajs
    this.router.navigate(['/stronaglowna']);
  }
  
}
}
