import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../models/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(page: number, pageSize: number): Observable<{ totalCount: number, posts: Post[] }> {
    const token = this.authService.getToken(); // Retrieve the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ totalCount: number, posts: Post[] }>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getPost(postId: number, page: number = 1, pageSize: number = 10): Observable<Post> {
    const token = this.authService.getToken(); // Retrieve the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set the Authorization header
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Return the post with paginated comments
    return this.http.get<Post>(`${this.apiUrl}/${postId}`, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  addPost(title: string, body: string): Observable<Post> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Post>(this.apiUrl, { title, body }, { headers }).pipe(
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
}
