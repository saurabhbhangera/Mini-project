import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Get all users
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return of(user);
  }

  // Update an existing user
  updateUser(updatedUser: User): Observable<User | undefined> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return of(updatedUser);
    }
    return of(undefined);  // ✅ Fixed: Returning `undefined` instead of `null`
  }

  // Delete a user
  deleteUser(userId: number): Observable<boolean> {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}