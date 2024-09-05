import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      // User is already logged in, redirect to a different page
      this.router.navigate(['/posts']);  // Redirect to the posts page
      return false;
    } else {
      return true;  // User is not logged in, allow access to the login page
    }
  }
}
