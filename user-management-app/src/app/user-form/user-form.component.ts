import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  template: `
    <form (ngSubmit)="addUser()">
      <input type="text" [(ngModel)]="userName" name="username" placeholder="Enter username" required>
      <button type="submit">Add User</button>
    </form>
  `,
  imports: [CommonModule, FormsModule], 
})
export class UserFormComponent {
  @Output() userAdded = new EventEmitter<void>();
  userName = '';

  constructor(private userService: UserService) {}

  addUser() {
    if (!this.userName.trim()) return;
    
    const newUser: User = { id: 0, name: this.userName }; 
    this.userService.addUser(newUser).subscribe(() => {
      this.userAdded.emit();
      this.userName = '';
    });
  }
}