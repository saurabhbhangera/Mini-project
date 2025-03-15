import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// ✅ WebSocket server configuration
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), importProvidersFrom(SocketIoModule.forRoot(config))]
})
  .catch((err) => console.error(err));
