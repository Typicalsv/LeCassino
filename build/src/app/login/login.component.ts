import { Component, AfterViewInit, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

    usernameError!: HTMLElement; // Added to handle username error messages
    passwordError!: HTMLElement;

    username!: HTMLInputElement;
    password!: HTMLInputElement;

    constructor(private authService: AuthService, private http: HttpClient) {} // Inject AuthService

    ngAfterViewInit(): void {
        this.usernameError = document.getElementById('usernameError') as HTMLElement; // Initialize username error
        this.passwordError = document.getElementById('passwordError') as HTMLElement;
        
        this.username = document.getElementById('username') as HTMLInputElement;
        this.password = document.getElementById('password') as HTMLInputElement;
    }

    login(event: Event): void {
        event.preventDefault();
        this.usernameError.textContent = ''; // Clear username error
        this.passwordError.textContent = ''; // Clear password error

        let isValid = true;

        if (this.username.value.trim() === '') {
            this.usernameError.textContent = 'Nazwa nie może być pusta'; // Use usernameError
            isValid = false;
        }

        if (this.password.value.trim() === '') {
            this.passwordError.textContent = 'Hasło jest wymagane'; // Clear password error
            isValid = false;
        }

        if (isValid) {
            console.log("Logging in with:", this.username.value, this.password.value); // Log the credentials
            this.authService.login(this.username.value, this.password.value).subscribe(success => {
                console.log("Login response:", success); // Log the response from the AuthService
                if (success) {
                    console.log("Login successful!");
                    // Redirect or perform other actions on successful login
                } else {
                    this.passwordError.textContent = "Nazwa użytkowanika lub hasło nieprawidłowe"
                }
            });
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
