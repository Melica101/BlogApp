import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getComments(postId: number, page: number = 1, pageSize: number = 5): Observable<any> {
    const token = this.authService.getToken();  // Retrieve the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Set the Authorization header
    });

    // Set pagination parameters for comments
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Fetch comments with pagination for a specific post
    return this.http.get<any>(`${this.apiUrl}/${postId}/comments`, { headers, params });
  }

  // Add a new comment to a specific post
  addComment(postId: number, commentBody: string): Observable<Comment> {
    const token = this.authService.getToken();  // Retrieve the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Set the Authorization header
      'Content-Type': 'application/json'
    });

    // Prepare the comment body
    const body = { body: commentBody };

    // Send POST request to add a new comment
    return this.http.post<Comment>(`${this.apiUrl}/${postId}/comments`, body, { headers });
  }
}
