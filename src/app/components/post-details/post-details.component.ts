import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  post: Post | undefined;  // Post data, including comments
  comments: Comment[] = [];  // To store the paginated comments
  newComment: string = '';
  page: number = 1;  // Current page
  pageSize: number = 5;  // Number of comments per page
  totalCommentsCount: number = 0;  // Total number of comments
  errorMessage: string | null = null;  // Error message holder
  loading: boolean = true;  // Loader indicator

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPost(postId);  // Load post and comments when the component is initialized
  }

  getInitials(author: string): string {
    if (!author || author.length === 0) return '';
    return author.charAt(0).toUpperCase();  // Return the first letter of the author's name
  }

  // Fetch the post data including paginated comments from the server
  loadPost(postId: number): void {
    this.postService.getPost(postId, this.page, this.pageSize).subscribe(
      (data) => {
        this.post = data;  // Assign the post data to the component
        this.comments = data.comments;  // Assign paginated comments
        this.totalCommentsCount = data.totalCommentsCount; // Get total comments count from the response
        this.loading = false;
      },
      (error) => {
        this.errorMessage = "An error occurred while loading the post.";
        this.loading = false;
      }
    );
  }

  // Method to calculate total pages based on the total number of comments and page size
  get totalPages(): number[] {
    const total = Math.ceil(this.totalCommentsCount / this.pageSize);  // Calculate total number of pages
    return Array.from({ length: total }, (_, i) => i + 1);  // Generate an array [1, 2, ..., total]
  }

  // Add a new comment to the post
  addComment(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    if (this.newComment) {
      this.commentService.addComment(postId, this.newComment).subscribe(
        (comment) => {
          this.comments.push(comment);  // Add the new comment to the comments array
          this.newComment = '';  // Clear the input field after adding the comment
          this.loadPost(postId);  // Reload the post to get updated paginated comments
        },
        (error) => {
          this.errorMessage = "An error occurred while adding the comment.";
        }
      );
    } else {
      alert('Please enter a comment.');
    }
  }

  // Navigate to the next page of comments
  nextPage(): void {
    if (this.page * this.pageSize < this.totalCommentsCount) {
      this.page++;
      this.loadPost(+this.route.snapshot.paramMap.get('id')!);  // Load next page of comments
    }
  }

  // Navigate to the previous page of comments
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPost(+this.route.snapshot.paramMap.get('id')!);  // Load previous page of comments
    }
  }

  // Navigate to a specific page
  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.loadPost(+this.route.snapshot.paramMap.get('id')!);  // Load comments for the specified page
  }
}
