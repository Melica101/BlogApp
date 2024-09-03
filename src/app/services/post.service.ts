import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://localhost:5001/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  addPost(title: string, body: string): Observable<Post> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<Post>(this.apiUrl, { title, body }, { headers });
  }
}
