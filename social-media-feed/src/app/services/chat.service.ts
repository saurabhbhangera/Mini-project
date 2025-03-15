import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private wsService: WebsocketService) {}

  sendMessage(msg: any) {
    this.wsService.sendMessage(msg);
  }

  getMessages() {
    return this.wsService.getMessages();
  }
}