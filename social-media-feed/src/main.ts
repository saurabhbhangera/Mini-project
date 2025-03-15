import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { feedReducer } from './app/store/reducer'; // Ensure this file exists
import { environment } from './environments/environment'; // Fix missing import

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Ensure environment.ts has firebaseConfig
    provideFirestore(() => getFirestore()),
    provideStore({ feed: feedReducer }),
  ],
});