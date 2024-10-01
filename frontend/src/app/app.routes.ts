import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthorDashboardComponent } from './author-dashboard/author-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { authorGuard } from './guards/author.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'author-dashboard', component: AuthorDashboardComponent,  canActivate: [authorGuard] },
    { path: '**', redirectTo: '' } 
  
];
