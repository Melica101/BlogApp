import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password, this.rememberMe).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token, this.username, this.rememberMe);
        this.router.navigate(['/posts']);  // Redirect after successful login
      },
      (error) => {
        this.errorMessage = 'Login failed: Invalid credentials';
      }
    );
  }
}
