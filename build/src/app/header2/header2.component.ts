import { ApplicationInitStatus, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header2',
  imports: [RouterModule],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  username = "";
  balance = 0;

  constructor(private app: AuthService) {
    this.username = app.username;
    this.balance = app.balance;
  }

  usernamelocal: string | null = localStorage.getItem('username');
  balancelocal: number | null = parseInt(localStorage.getItem('balance') || "0");

  clearLocalStorage(): void {
    localStorage.clear();
  }

  logLocalStorage(): void {
    console.log("Local Storage Contents:", localStorage);
  }

  // New logout method
  logout(): void {
    this.app.logout(); // Call the logout method from AuthService
  }
}
