import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  postId: any;
  username: string = "";
  balance: number = 0;
  loggedis = false

  constructor(private router: Router, private http: HttpClient) {

  }

  postData(name: string, pass: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/login', {
      username: name,
      password: pass
    });
  }

  login(username: string, password: string): Observable<boolean> {
    console.log("Attempting to log in with:", username, password);
  
    return new Observable<boolean>(observer => {
      this.postData(username, password).subscribe(
        data => {
          this.postId = data.id;
          localStorage.setItem('username', data.user.username);
          parseFloat(data.user.balance);
          localStorage.setItem('balance', data.user.balance);

          localStorage.setItem('loggedIn', 'true');

          this.router.navigate(['/main']);
          observer.next(true); 
          observer.complete();
          window.location.reload()
        },
        error => {
          localStorage.setItem('loggedIn', 'false');
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  logout(): void {

    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/login']);

    window.location.reload()
  }

  isLoggedIn(): boolean {
    const storedStatus = localStorage.getItem('loggedIn');
    return storedStatus === 'true';
  }
}
