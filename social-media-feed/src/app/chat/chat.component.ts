import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule] // ✅ FIX: Add FormsModule
})
export class ChatComponent {
  websocketService = inject(WebsocketService);
  messages: { sender: string; text: string }[] = [];
  messageInput: string = '';

  ngOnInit() {
    this.websocketService.getMessages().subscribe((msg: any) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.messageInput.trim()) {
      this.websocketService.sendMessage({
        sender: 'User',
        text: this.messageInput
      });
      this.messageInput = '';
    }
  }
}