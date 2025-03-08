import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }}
        <button (click)="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  `,
  imports: [CommonModule], 
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(success => {
      if (success) this.loadUsers();
    });
  }
}