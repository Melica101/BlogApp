import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/login';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  setToken(token: string, username: string, rememberMe: boolean): void {
    if (rememberMe) {
      // Store token and username in cookies if "Remember Me" is checked
      this.cookieService.set('token', token, 7);  // 7 days expiry
      this.cookieService.set('username', username, 7);
    } else {
      // Store token and username in localStorage for session-based storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : this.cookieService.get('token');
  }

  getUsername(): string | null {
    const username = localStorage.getItem('username');
    return username ? username : this.cookieService.get('username');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.cookieService.delete('token');
    this.cookieService.delete('username');
  }
}
