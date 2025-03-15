import { Injectable } from '@angular/core';
import { Socket, SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) {}

  // Listen for feed updates
  getFeed() {
    return this.socket.fromEvent('feed');
  }

  // Emit new post
  sendNewPost(post: any) {
    this.socket.emit('newPost', post);
  }

  // Emit like on a post
  likePost(postId: number) {
    this.socket.emit('likePost', postId);
  }

  // Emit comment on a post
  commentOnPost(postId: number, comment: string) {
    this.socket.emit('commentOnPost', { postId, comment });
  }
}
