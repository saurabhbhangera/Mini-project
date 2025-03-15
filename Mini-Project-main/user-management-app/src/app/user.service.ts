import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Tony Stark', email: 'tony@example.com', phone: '1234567890' }];
  private nextId = 2;

  constructor() {}

  // Get all users
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    user.id = this.nextId++;
    this.users.push(user);
    return of(user);
  }

  // Update an existing user
  updateUser(updatedUser: User): Observable<User | null> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return of(updatedUser);
    }
    return of(null!);
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
