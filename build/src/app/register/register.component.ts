import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  constructor(private http: HttpClient, private router: Router)
  {

  }


  nameError!: HTMLElement;
  surnameError!: HTMLElement;
  peselError!: HTMLElement;
  usernameError!: HTMLElement;
  passwordError!: HTMLElement;
  confirmPasswordError!: HTMLElement;
  phone !: HTMLInputElement;
  name!: HTMLInputElement;
  surname!: HTMLInputElement;
  pesel!: HTMLInputElement;
  username!: HTMLInputElement;
  password!: HTMLInputElement;
  confirmPassword!: HTMLInputElement;

  ngAfterViewInit() {
    this.nameError = document.getElementById('nameError') as HTMLElement;
    this.surnameError = document.getElementById('surnameError') as HTMLElement;
    this.peselError = document.getElementById('peselError') as HTMLElement;
    this.usernameError = document.getElementById('usernameError') as HTMLElement;
    this.passwordError = document.getElementById('passwordError') as HTMLElement;
    this.confirmPasswordError = document.getElementById('confirmPasswordError') as HTMLElement;
    this.phone = document.getElementById('phone') as HTMLInputElement;
    this.name = document.getElementById('name') as HTMLInputElement;
    this.surname = document.getElementById('surname') as HTMLInputElement;
    this.pesel = document.getElementById('pesel') as HTMLInputElement;
    this.username = document.getElementById('username') as HTMLInputElement;
    this.password = document.getElementById('password') as HTMLInputElement;
    this.confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;
  }

  usernam = "";
  passwor = "";
  nam = "";
  surnam = "";
  pese = "";
  phon = "";

  register(username: string, password: string, name: string, surname: string, pesel: string, phone: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/register', { 
      username,
      password,
      name,
      surname,
      pesel,
      phone

    });
    

  }

  checkInputs(event: Event): void {
    event.preventDefault();

    // Clear previous error messages
    this.nameError.textContent = "";
    this.surnameError.textContent = "";
    this.peselError.textContent = "";
    this.usernameError.textContent = "";
    this.passwordError.textContent = "";
    this.confirmPasswordError.textContent = "";

    let isValid = true;

    // Form validation logic
    if (!this.name.value.trim()) {
      this.nameError.textContent = "Imię jest wymagane";
      isValid = false;
    }
    if (!this.surname.value.trim()) {
      this.surnameError.textContent = "Nazwisko jest wymagane";
      isValid = false;
    }
    if (!this.pesel.value.trim()) {
      this.peselError.textContent = "PESEL jest wymagany";
      isValid = false;
    } else if (this.pesel.value.length !== 11 || !/^[0-9]+$/.test(this.pesel.value)) {
      this.peselError.textContent = "PESEL musi mieć 11 cyfr";
      isValid = false;
    } else if (!this.isOver18(this.pesel.value)) {
      this.peselError.textContent = "Musisz mieć co najmniej 18 lat";
      isValid = false;
    }

    if (!this.username.value.trim() || this.username.value.length < 5 || this.username.value.length > 20 || !/^[a-zA-Z0-9]+$/.test(this.username.value)) {
      this.usernameError.textContent = "Nazwa musi mieć 5-20 znaków i zawierać tylko litery i cyfry";
      isValid = false;
    }

    if (!this.password.value.trim() || this.password.value.length < 8 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password.value)) {
      this.passwordError.textContent = "Hasło musi mieć min. 8 znaków, dużą literę, cyfrę i znak specjalny";
      isValid = false;
    }
    if (!this.confirmPassword.value.trim() || this.confirmPassword.value !== this.password.value) {
      this.confirmPasswordError.textContent = "Hasła nie są zgodne";
      isValid = false;
    }
    if (isValid) {
      console.log("Form is valid, proceeding with registration...");

      this.register(this.usernam, this.passwor, this.nam, this.surnam, this.pese, this.phon).subscribe()
      this.router.navigate(["/login"])
    }
  }


  isOver18(pesel: string): boolean {
    const rok = parseInt(pesel.substring(0, 2), 10);
    let miesiac = parseInt(pesel.substring(2, 4), 10);
    const dzien = parseInt(pesel.substring(4, 6), 10);
    const dataAktualna = new Date();

    let rokUrodzenia = rok;
    if (miesiac > 80) {
      rokUrodzenia += 1800;
      miesiac -= 80;
    } else if (miesiac > 60) {
      rokUrodzenia += 2200;
      miesiac -= 60;
    } else if (miesiac > 40) {
      rokUrodzenia += 2100;
      miesiac -= 40;
    } else if (miesiac > 20) {
      rokUrodzenia += 2000;
      miesiac -= 20;
    } else {
      rokUrodzenia += 1900;
    }

    const dataUrodzenia = new Date(rokUrodzenia, miesiac - 1, dzien);
    const wiek = dataAktualna.getFullYear() - dataUrodzenia.getFullYear();
    return wiek > 18 || (wiek === 18 && (dataAktualna.getMonth() > dataUrodzenia.getMonth() || (dataAktualna.getMonth() === dataUrodzenia.getMonth() && dataAktualna.getDate() >= dataUrodzenia.getDate())));

  }

  togglePasswordVisibilityOne() {
    const Password_visible = document.getElementById('password') as HTMLInputElement;

    if (Password_visible.type == 'password') {
      Password_visible.type = 'text'
    } else {
      Password_visible.type = 'password'
    }
  }

  togglePasswordVisibilityTwo() {
    const Password_visible = document.getElementById('confirm-password') as HTMLInputElement;

    if (Password_visible.type == 'password') {
      Password_visible.type = 'text'
    } else {
      Password_visible.type = 'password'
    }
  }

}
