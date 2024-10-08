import { Comment } from './comment';

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  totalCommentsCount: number;
  comments: Comment[];
}
