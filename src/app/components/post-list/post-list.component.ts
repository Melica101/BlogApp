import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  posts: Post[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 5;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts(this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.posts = data.posts;
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }
}

