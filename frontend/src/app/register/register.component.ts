import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule , HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(form: any) {
    const { name, email, password, password_confirmation } = form.value;

    if (password !== password_confirmation) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register({ name, email, password, password_confirmation }).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    );
  }
}
