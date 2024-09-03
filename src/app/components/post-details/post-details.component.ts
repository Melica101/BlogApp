import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  post: Post | undefined;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPost(postId);
    this.loadComments(postId);
  }

  loadPost(postId: number): void {
    this.postService.getPost(postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.error('Error fetching post', error);
      }
    );
  }

  loadComments(postId: number): void {
    this.commentService.getComments(postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments', error);
      }
    );
  }

  addComment(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    if (this.newComment) {
      this.commentService.addComment(postId, this.newComment).subscribe(
        (data) => {
          this.comments.push(data);
          this.newComment = '';
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    } else {
      alert('Please enter a comment.');
    }
  }
}
