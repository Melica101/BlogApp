import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BlogApp';
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const currentRoute = this.router.url;
      // Redirect only if the user is on the login page
      if (currentRoute === '/login') {
        this.router.navigate(['/posts']);  // Redirect to posts if logged in
      }
    }
  }

  // Determine if the header should be displayed (hide it on the login page)
  shouldShowHeader(): boolean {
    return this.router.url !== '/login' && this.authService.getToken() !== null;
  }
}
