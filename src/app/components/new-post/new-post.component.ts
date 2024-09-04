import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  title: string = '';
  body: string = '';
  errorMessage: string | null = null;

  constructor(private postService: PostService, private router: Router) {}

  onSubmit(): void {
    if (this.title && this.body) {
      this.postService.addPost(this.title, this.body).subscribe(
        () => {
          this.router.navigate(['/posts']);
        },
        (error) => {
          this.errorMessage = "An error occurred while adding the post.";
        }
      );
    } else {
      alert('Please fill out all fields.');
    }
  }

}
