import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UserService],
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
    .getUsers()
    .pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array or handle the error as needed
      })
    )
    .subscribe(users => {
      this.users = users;
      console.log('Found users:', users);
    });
  }
  
}
