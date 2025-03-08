import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';  
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, UserFormComponent, UserListComponent],  
})
export class AppComponent {
  loadUsers() {
    console.log('Users reloaded');
  }
}