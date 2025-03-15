import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures it's available throughout the app
})
export class WebsocketService {
  private subject = new Subject<any>();

  constructor() {
    // Simulating WebSocket connection
    setTimeout(() => {
      this.subject.next({ sender: 'System', text: 'Welcome to the chat!' });
    }, 1000);
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: any) {
    this.subject.next(message); // Simulate sending a message
  }
}
