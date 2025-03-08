import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provides HTTPClientModule
    provideAnimations(), // Optional: If you use animations
    importProvidersFrom(FormsModule) // Provides FormsModule
  ],
}).catch(err => console.error(err));



