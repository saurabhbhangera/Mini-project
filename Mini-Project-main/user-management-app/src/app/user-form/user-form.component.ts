import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnChanges {
  @Input() userToEdit: User | null = null; 
  @Output() userUpdated = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();

  user: User = { id: 0, name: '', email: '', phone: '' }; 

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit'] && this.userToEdit) {
      this.user = { ...this.userToEdit }; 
    }
  }

  saveUser(): void {
    if (this.user.id === 0) {
      this.userService.addUser(this.user).subscribe(() => {
        this.userAdded.emit();
        this.resetForm();
      });
    } else {
      this.userService.updateUser(this.user).subscribe(() => {
        this.userUpdated.emit();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.user = { id: 0, name: '', email: '', phone: '' };
  }
}
