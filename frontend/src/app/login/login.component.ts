import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Add successMessage property

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    const { email, password } = form.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        // Clear messages on successful login
        this.errorMessage = '';
        this.successMessage = 'Login successful! Redirecting...'; // Set success message
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ role: response.role, user: response.user }));

        this.authService.setAuth(true);
        this.authService.setBearerToken(response.token);
        this.authService.setUser(response.user);

        setTimeout(() => {
          if (response.role === 'author') {
            this.router.navigate(['/author-dashboard']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }, 2000); // 2 seconds delay
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = error.error?.error || 'Login failed, please check your credentials.';
      }
    );
  }
}
