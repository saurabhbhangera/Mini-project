import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addPost, likePost } from '../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  imports: [CommonModule], // ✅ Included CommonModule for structural directives
})
export class FeedComponent implements OnInit {
  store = inject(Store);
  posts$: Observable<any[]> = this.store.select(state => state.feed.posts);

  ngOnInit() {
    this.posts$.subscribe(posts => console.log('New feed update:', posts));
  }

  addPost() {
    const newPost = { id: Date.now().toString(), content: 'New Post!', likes: 0, comments: [] };
    this.store.dispatch(addPost({ post: newPost }));
  }

  like(postId: string) {
    this.store.dispatch(likePost({ postId }));
  }
}