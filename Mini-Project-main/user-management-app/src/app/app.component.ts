import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, UserListComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];
  selectedUser: User | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  setUserForEdit(user: User): void {
    this.selectedUser = { ...user };

  }
}
