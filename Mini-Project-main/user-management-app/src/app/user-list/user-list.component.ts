import { Component, OnInit,Input,EventEmitter,Output} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); 
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(userId: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
  }
  editUserDetails(user: User): void {
    this.editUser.emit(user); 
  }
}
