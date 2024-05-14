import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  user: User = { _id: '', name: '', age: 0, email: '' };

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.userService
        .getUser(id)
        .pipe(
          catchError((error) => {
            console.error('Error fetching user:', error);
            return of(null);
          })
        )
        .subscribe((user) => {
          if (user) {
            this.user = user;
          }
        });
    }
  }

  saveUser() {
    if (!this.user) {
      console.error('Invalid user params.');
      return;
    }

    if (this.isEditMode) {
      console.log('trying to edit this user: ', this.user);
      this.userService
        .editUser(this.user._id, this.user.name, this.user.age, this.user.email)
        .pipe(
          catchError((error) => {
            console.error('Error updating user:', error);
            return of(null);
          })
        )
        .subscribe((user) => {
          this.router.navigate(['/users']);
          console.log('User edited!', user);
        });
    } else {
      console.log('trying to create this user: ', this.user);
      this.userService
        .createUser(this.user.name, this.user.age, this.user.email)
        .pipe(
          catchError((error) => {
            console.error('Error creating user:', error);
            return of(null);
          })
        )
        .subscribe((user) => {
          this.router.navigate(['/users']);
          console.log('User created!', user);
        });
    }
  }
}
