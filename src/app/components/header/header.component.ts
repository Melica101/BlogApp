import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the logged-in user's username from AuthService
    this.username = this.authService.getUsername();
  }

  // Log the user out and redirect to the login page
  logout(): void {
    this.authService.logout();  // Clear the token and username
    this.router.navigate(['/login']);  // Redirect to the login page
  }
}
