import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    { path: 'user/:id', component: UserDetailsComponent },
    { path: 'newUser', component: UserFormComponent },
    { path: 'editUser', component: UserFormComponent },
    { path: 'editUser/:id', component: UserFormComponent },
];
