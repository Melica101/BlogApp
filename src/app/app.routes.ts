import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] }
];
