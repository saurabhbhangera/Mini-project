import { Component, OnInit } from '@angular/core';
import { FeedComponent } from './components/feed/feed.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  feed: any[] = [];

  constructor(private socket: Socket) {}

  ngOnInit() {
    console.log("AppComponent Loaded!");

   
    this.socket.fromEvent('feed').subscribe((data: any) => {
      console.log("Feed Data Received:", data);
      this.feed = data;
    });
  }

  
  sendNewPost() {
    const newPost = { id: Date.now(), content: "New Post!", likes: 0, comments: [] };
    this.socket.emit('newPost', newPost);
  }
}
