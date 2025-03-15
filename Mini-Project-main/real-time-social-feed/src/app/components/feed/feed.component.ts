import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any[] = [];
  newPostContent: string = '';

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.socket.fromEvent('feed').subscribe((data: any) => {
      this.feed = data;
    });
  }

  addPost() {
    if (this.newPostContent.trim()) {
      const newPost = {
        id: Date.now(),
        content: this.newPostContent,
        likes: 0,
        comments: []
      };
      this.socket.emit('newPost', newPost);
      this.newPostContent = '';
    }
  }

  likePost(postId: number) {
    this.socket.emit('likePost', postId);
  }

  commentOnPost(postId: number, comment: string) {
    if (comment.trim()) {
      this.socket.emit('commentOnPost', { postId, comment });
    }
  }
}
