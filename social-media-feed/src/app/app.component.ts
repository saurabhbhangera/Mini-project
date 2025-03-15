import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; // ✅ Corrected import path
import { FeedComponent } from './feed/feed.component'; // ✅ Corrected import path
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ChatComponent, FeedComponent, RouterModule], // ✅ Included RouterModule for routing support
})
export class AppComponent {
  title = 'social-media-feed'; // ✅ Added title
  notificationService = inject(NotificationService);

  enableNotifications() {
    this.notificationService.requestPermission();
  }
}