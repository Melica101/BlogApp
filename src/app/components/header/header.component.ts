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

  getInitials(user: string | null): string {
    if (!user || user.length === 0) return '';
    return user.charAt(0).toUpperCase();
  }

  logout(): void {
    this.authService.logout();  // Clear the token and username
    this.router.navigate(['/login']);
  }
}
