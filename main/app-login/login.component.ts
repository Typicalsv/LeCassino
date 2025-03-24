import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

    nameError!: HTMLElement;
    passwordError!: HTMLElement;

    username!: HTMLInputElement;
    password!: HTMLInputElement;

  ngAfterViewInit(): void {
    this.nameError = document.getElementById('nameError') as HTMLElement;
    this.passwordError = document.getElementById('passwordError') as HTMLElement;
    
    this.username = document.getElementById('username') as HTMLInputElement;
    this.password = document.getElementById('password') as HTMLInputElement;
    
  }

  checkInputs(event: Event): void {
    event.preventDefault();

    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;


    const usernameError = document.getElementById('usernameError') as HTMLElement;
    const passwordError = document.getElementById('passwordError') as HTMLElement;;
    
    
    usernameError.textContent = '';
    passwordError.textContent = '';
    

    let isValid = true;


    if (username.value.trim() === '') {
        usernameError.textContent = 'Nazwa nie może być pusta';
        isValid = false;
    } else if (username.value.length < 5) {
        usernameError.textContent = 'Nazwa musi mieć co najmniej 5 znaków';
        isValid = false;
    } else if (username.value.length > 20) {
        usernameError.textContent = 'Nazwa nie może mieć więcej niż 20 znaków';
        isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username.value)) {
        usernameError.textContent = 'Nazwa może zawierać tylko litery i cyfry';
        isValid = false;
    }


    if (password.value.trim() === '') {
        passwordError.textContent = 'Hasło jest wymagane';
        isValid = false;
    }
    else if(password.value.length < 8){
        passwordError.textContent = 'Hasło musi mieć co najmniej 8 znaków';
        isValid = false;
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)) {
        passwordError.textContent = 'Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny';
        isValid = false;
    }

    if (isValid) {
      console.log("Formularz poprawnie wypełniony!");
    }

  }


  showPassword() {
    const password = document.getElementById('password') as HTMLInputElement;
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }


}
}
