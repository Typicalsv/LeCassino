import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoginOrRegister = route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register';
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      if (isLoginOrRegister) {
        this.router.navigate(['main']); // Redirect to main if logged in and trying to access login/register
        return false; // Prevent access to login/register
      }
      return true; // Allow access to game routes
    } else {
      if (isLoginOrRegister) {
        return true; // Allow access to login/register if not logged in
      }
      this.router.navigate(['login']); // Redirect to login if not logged in and trying to access game routes
      return false; // Prevent access to game routes
    }
  }
}
