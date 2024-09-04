import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  constructor(public authService: AuthService, private router: Router) {}

  // Determine if the header should be displayed (hide it on the login page)
  shouldShowHeader(): boolean {
    return this.router.url !== '/login' && this.authService.getToken() !== null;
  }
}
