import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Invalid user id.');
      return;
    }
    this.userService
      .getUser(id)
      .pipe(
        catchError((error) => {
          console.error('Error fetching user:', error);
          return of(null);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  deleteUser() {
    if (!this.user || !this.user._id) {
      console.error('Invalid user or user id.');
      return;
    }
    
    this.userService.deleteUser(this.user._id).subscribe(result => {
      this.router.navigate(['/users']);
    });
  }
}
