import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors globally
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Store token and username in localStorage
  setToken(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);  // Store the username as well
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve the logged-in username from localStorage
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Clear token and username from localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
