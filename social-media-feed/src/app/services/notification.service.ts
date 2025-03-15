import { Injectable, inject } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FirebaseApp } from '@angular/fire/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  message$ = new BehaviorSubject<any>(null);
  private messaging = getMessaging(inject(FirebaseApp)); // Inject FirebaseApp

  constructor() {
    this.listenForMessages();
  }

  async requestPermission() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'YOUR_VAPID_KEY_HERE' // Replace with your actual VAPID key from Firebase
      });

      if (token) {
        console.log('FCM Token:', token);
      } else {
        console.warn('No FCM token received. User may have denied permission.');
      }
    } catch (error) {
      console.error('Error getting permission for notifications:', error);
    }
  }

  private listenForMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      this.message$.next(payload);
    });
  }
}